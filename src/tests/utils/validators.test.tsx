import {isRequired} from "../../utils/validators";

describe('utils/validators', () => {
  it('should return false if the field is empty', () => {
    expect(isRequired('')).toBeFalsy()
  })
  it('should return true if the field is filled', () => {
    expect(isRequired('A')).toBeTruthy()
  })
})
