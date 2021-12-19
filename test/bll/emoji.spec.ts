import "jasmine";
import { CHECKED, addChecked } from "../../src/bll/emoji"

describe('toggleChecked', () => {
    it('должен добавить чек-бокс(symbol) в начале строки если его нет', () => {
        expect(addChecked('test')).toEqual(CHECKED + ' test');
    });
});