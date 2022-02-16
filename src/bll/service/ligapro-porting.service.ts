import { LigaProItem } from '../dto/liga-pro-item.type';
import ILigaProPortingService from "./iligapro-porting.service";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import config from "../../config";
import logger from "../logger";
import LigaProItemDTO from '../dto/liga-pro-item.dto';

var xmlToJSConverter = require('xml-js');

export default class LigaProPortingService implements ILigaProPortingService {
  private readonly _ligaProFileName: string = "ligapro-items.xml";
  private readonly _ligaProXMLPath: string;

  constructor() {
    this._ligaProXMLPath = path.join(config.tmp_folder, this._ligaProFileName);
  }

  public import() {
    const writeStream = fs.createWriteStream(this._ligaProXMLPath, {
      flags: "w",
    });

    writeStream.on("error", (error) =>
      logger.error(
        error,
        "Something went wrong. Unable create or write to %fileName",
        this._ligaProXMLPath
      )
    );

    http.get(
      "http://117536.ligapro.ua/files/yandex_xml/rem_xml_fc1f0_b3484.xml",
      function (response: http.IncomingMessage) {
        response.pipe(writeStream);
      }
    );
  }

  public getItems(): Map<string, LigaProItemDTO> {
    let itemsMap = new Map<string, LigaProItemDTO>();
    let xmlData: string = "";

    try {
      xmlData = fs.readFileSync(this._ligaProXMLPath, "utf-8");
    } catch (error) {
      logger.error(
        error,
        "Unable to read file: %filePath",
        this._ligaProXMLPath
      );
    }

    const ligaProJS = xmlToJSConverter.xml2js(xmlData, {
      compact: true,
      trim: true,
      alwaysArray: true,
      ignoreDeclaration: true,
    });

    if (ligaProJS && ligaProJS['realty-feed'] && ligaProJS['realty-feed'][0].offer && ligaProJS['realty-feed'][0].offer.length) {
        ligaProJS['realty-feed'][0].offer.forEach((item: LigaProItem) => {
          itemsMap.set(item._attributes['internal-id'], new LigaProItemDTO(item));
        });
    } else {
        logger.warn('No items returned by reading liga pro xml file.');
    }

    return itemsMap;
  }
}
