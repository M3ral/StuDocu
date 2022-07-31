import {render, screen} from "@testing-library/react";
import {Button, ButtonProps, ButtonVariant} from "../../components/Button/Button";

const mockProps: ButtonProps[] = [
  {
    onClick: jest.fn(),
    variant: 'primary' as ButtonVariant,
    children: 'Button 1'
  },
  {
    onClick: jest.fn(),
    disabled: true,
    variant: 'secondary' as ButtonVariant,
    children: 'Button 2'
  },
  {
    onClick: jest.fn(),
    variant: 'tertiary' as ButtonVariant,
    children: 'Button 3'
  },
]
describe('components/Button', () => {
  it('should render the component', () => {
    mockProps.forEach(({children, ...props}, i) => {
      render(<Button key={i} {...props}>{children}</Button>)
    })
  })
  it('should be disabled', () => {
    const props = mockProps[1]
    render(<Button {...props}>Click me</Button>);
    expect(screen.getByText(/Click me/i)).toHaveAttribute('disabled');
  })
})





