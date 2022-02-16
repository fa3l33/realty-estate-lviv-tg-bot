import LigaProItemDTO from '../dto/liga-pro-item.dto';

export default interface ILigaProPortingService {
    import() : void;
    getItems(): Map<string, LigaProItemDTO>;
}