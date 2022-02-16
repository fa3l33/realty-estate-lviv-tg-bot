import ILigaProJob from "./iligapro.job";
import * as http from 'http';
import * as fs from 'fs'

export default class LigaProJob implements ILigaProJob {
    start(): void {
        const file = fs.createWriteStream('C:\\Users\\ychernenko\\Projects\\real-estate-tg-bot\\tmp\\ligapro-items.xml');

        http.get("http://117536.ligapro.ua/files/yandex_xml/ya_xml_fc1f0_b3484.xml", function(response: http.IncomingMessage) {
          response.pipe(file);
        });
    }
}