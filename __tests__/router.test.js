/**
 * @jest-environment jsdom
 */

import { TestScheduler } from '@jest/core'
import {pushToHistory} from '../scripts/router.js'
describe('length of history stack', () => {
    test('with settings', () => {
        // console.log(pushToHistory("setting", 0).length);
        expect(pushToHistory("settings", 0).length).toBe(2);
    })

    test('with entry', () => {
        // console.log(pushToHistory("entry", 4).length);
        expect(pushToHistory("entry", 1).length).toBe(3);
    })

    test("with empty", () => {
        // console.log(pushToHistory("", 10).length);
        expect(pushToHistory("", 2).length).toBe(4);
    })
})