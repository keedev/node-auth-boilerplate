

export class Util {
    static GetCommonStringFromMultipleList(list: string[][]) {

        if (list.length == 0)
            return [];

        return list.reduce(
            (previous, current) =>
                previous.filter(e => current.includes(e))
        );
    }

    static RemoveDuplicateFromMultipleList(list: string[][]) {

        if (list.length == 0)
            return [];

        return list.reduce(
            (previous, current) => {
                let array = [...previous, ...current];
                return array.filter((item, index) => array.indexOf(item) === index);
            }
        );
    }

    /**
     * return true if the list contains one or more valid string
     * @param list a list of string
     */
    static IsStringListContainValue(list: string[]) {
        let flag: boolean = false;
        for (const data of list) {
            if (data) {
                flag = true;
                break;
            }
        }
        return flag;
    }
}