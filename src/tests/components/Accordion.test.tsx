import {fireEvent, screen} from "@testing-library/react";
import {Accordion, AccordionProps} from "../../components/Accordion/Accordion";
import {renderWithProviders} from "../helpers/test-utils";

const mockProps: AccordionProps = {
  question: 'What is the name of this component?',
  answer: 'Accordion',
  id: '1'
}

it('should render the component', () => {
  renderWithProviders(<Accordion {...mockProps}/>)
  expect(screen.queryByText(/accordion/i)).toBeNull()
  const heading = screen.getByRole('heading', {name: /what is the name of this component\?/i})
  expect(heading).toBeInTheDocument()
  fireEvent.click(heading)
  expect(screen.getByText(/accordion/i)).toBeInTheDocument()
})

it('should have a delete button', async () => {
  renderWithProviders(<Accordion {...mockProps}/>)
  const button = screen.getByRole('button', {name: /delete/i})
  fireEvent.click(button)
})

it('should have an update link', async () => {
  renderWithProviders(<Accordion {...mockProps}/>)
  const link = screen.getByRole('link', {name: /edit/i})
  fireEvent.click(link)
})
