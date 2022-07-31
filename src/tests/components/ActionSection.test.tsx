import {ActionSection} from "../../components/ActionSection/ActionSection";
import {renderWithProviders} from "../helpers/test-utils";
import {screen} from "@testing-library/react";

describe('components/ActionSection', () => {
  it('should render the section with the two buttons', async () => {
    renderWithProviders(<ActionSection/>)
    const items = await screen.findAllByRole('button')
    expect(items).toHaveLength(2)
  })
})
