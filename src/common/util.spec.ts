import { Util } from "./util";

describe('GetCommonStringFromMultipleList', () => {

    test('should return empty array if list is empty', async () => {
        // Execute
        let result = Util.GetCommonStringFromMultipleList([]);

        // Result
        expect(result.length).toEqual(0);
    });

    test('should return empty array if child list is empty', async () => {
        // Setup
        let list_1:any[] = [];
        let list_2:any[] = [];

        // Execute
        let result = Util.GetCommonStringFromMultipleList([list_1, list_2]);

        // Result
        expect(result.length).toEqual(0);
    });

    test('should able to retrieve a common string from 2 arrays', async () => {
        // Setup
        let list_1 = ["apple", "banana", "orange"];
        let list_2 = ["watermelon", "banana", "grape"];

        // Execute
        let result = Util.GetCommonStringFromMultipleList([list_1, list_2]);

        // Result
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual("banana");
    });


    test('should able to retrieve a common string from more arrays', async () => {
        // Setup
        let list_1 = ["apple", "banana", "orange"];
        let list_2 = ["watermelon", "banana", "grape"];
        let list_3 = ["durian", "banana", "lemon", "orange"];

        // Execute
        let result = Util.GetCommonStringFromMultipleList([list_1, list_2, list_3]);

        // Result
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual("banana");
    });

    test('should able to retrieve multiple common strings from more arrays', async () => {
        // Setup
        let list_1 = ["apple", "banana", "orange", "coconut"];
        let list_2 = ["watermelon", "banana", "grape","coconut"];
        let list_3 = ["berry", "banana", "lemon", "orange","coconut"];
        let list_4 = ["banana","coconut"];

        // Execute
        let result = Util.GetCommonStringFromMultipleList([list_1, list_2, list_3,list_4]);

        // Result
        expect(result.length).toEqual(2);
        expect(result[0]).toEqual("banana");
        expect(result[1]).toEqual("coconut");
    });
})


describe('RemoveDuplicateFromMultipleList', () => {

    test('should return empty array if list is empty', async () => {
        // Execute
        let result = Util.RemoveDuplicateFromMultipleList([]);

        // Result
        expect(result.length).toEqual(0);
    });

    test('should return empty array if child list is empty', async () => {
        // Setup
        let list_1:any[] = [];
        let list_2:any[] = [];

        // Execute
        let result = Util.RemoveDuplicateFromMultipleList([list_1, list_2]);

        // Result
        expect(result.length).toEqual(0);
    });

    test('should able to remove a duplicate from 2 arrays', async () => {
        // Setup
        let list_1 = ["apple", "banana", "orange"];
        let list_2 = ["watermelon", "banana", "grape"];

        // Execute
        let result = Util.RemoveDuplicateFromMultipleList([list_1, list_2]);

        // Result
        expect(result.length).toEqual(5);
        expect(result[0]).toEqual("apple");
        expect(result[1]).toEqual("banana");
        expect(result[2]).toEqual("orange");
        expect(result[3]).toEqual("watermelon");
        expect(result[4]).toEqual("grape");
    });


    test('should able to remove multiple duplicate of same type from multiple arrays', async () => {
        // Setup
        let list_1 = ["apple", "banana", "orange"];
        let list_2 = ["watermelon", "banana", "grape"];
        let list_3 = ["durian", "banana", "lemon"];
        let list_4 = ["banana"];

        // Execute
        let result = Util.RemoveDuplicateFromMultipleList([list_1, list_2, list_3, list_4]);

        // Result
        expect(result.length).toEqual(7);
        expect(result[0]).toEqual("apple");
        expect(result[1]).toEqual("banana");
        expect(result[2]).toEqual("orange");
        expect(result[3]).toEqual("watermelon");
        expect(result[4]).toEqual("grape");
        expect(result[5]).toEqual("durian");
        expect(result[6]).toEqual("lemon");
    });

    test('should able to remove multiple duplicates of different type from multiple arrays', async () => {
        // Setup
        let list_1 = ["apple", "banana", "orange", "coconut"];
        let list_2 = ["watermelon", "banana", "grape","coconut"];
        let list_3 = ["berry", "banana", "lemon", "orange","coconut"];
        let list_4 = ["banana","coconut"];
        let list_5 = ["orange"];

        // Execute
        let result = Util.RemoveDuplicateFromMultipleList([list_1, list_2, list_3,list_4,list_5]);

        // Result
        expect(result.length).toEqual(8);
        expect(result[0]).toEqual("apple");
        expect(result[1]).toEqual("banana");
        expect(result[2]).toEqual("orange");
        expect(result[3]).toEqual("coconut");
        expect(result[4]).toEqual("watermelon");
        expect(result[5]).toEqual("grape");
        expect(result[6]).toEqual("berry");
        expect(result[7]).toEqual("lemon");
    });
})

describe('IsStringListContainValue', () => {

    test('should return true if all value in list are valid', async () => {
        // Execute
        let result = Util.IsStringListContainValue(["orange","banana","apple"]);

        // Result
        expect(result).toEqual(true);
    });


    test('should return true if contains one valid string in list', async () => {
        // Execute
        let result = Util.IsStringListContainValue(["","","apple"]);

        // Result
        expect(result).toEqual(true);
    });

    test('should return true if contains one or more valid string in list', async () => {
        // Execute
        let result = Util.IsStringListContainValue(["","banana","apple"]);

        // Result
        expect(result).toEqual(true);
    });

    test('should return false if no valid string in list', async () => {
        // Execute
        let result = Util.IsStringListContainValue(["",""]);

        // Result
        expect(result).toEqual(false);
    });

    test('should return false if no valid string in list, with null and undefined', async () => {
        // Execute
        let result = Util.IsStringListContainValue(["",null as any, undefined as any]);

        // Result
        expect(result).toEqual(false);
    });


    test('should return false if list is empty', async () => {
        // Execute
        let result = Util.IsStringListContainValue([]);

        // Result
        expect(result).toEqual(false);
    });

})
