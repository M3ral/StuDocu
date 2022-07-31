import {fireEvent, render, screen} from "@testing-library/react";
import {TooltipPosition, TooltipWrapper} from "../../components/TooltipWrapper/TooltipWrapper";
import React from "react";


const Component = ({position, ...props}: { position: TooltipPosition }) => {
  return (
    <TooltipWrapper position={position} margin={15} text='Tooltip text' data-testid='tooltip' {...props}>
      <p>Hi</p>
    </TooltipWrapper>
  )
}

describe('TooltipWrapper', () => {
  it('on position bottom, should show a tooltip', async () => {
    render(<Component position={'bottom' as TooltipPosition}/>)
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      opacity: 0,
      zIndex: '-1'
    });
    fireEvent.mouseOver(screen.getByText(/hi/i))
    expect(screen.getByTestId('tooltip')).toMatchInlineSnapshot(`
<div
  class="tooltip"
  data-testid="tooltip"
  style="opacity: 1; z-index: 999; left: 0px; top: 15px;"
>
  Tooltip text
</div>
`);
  })

  it('on position top, should show a tooltip', async () => {
    render(<Component position={'top' as TooltipPosition}/>)
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      opacity: 0,
      zIndex: '-1'
    });
    fireEvent.mouseOver(screen.getByText(/hi/i))
    expect(screen.getByTestId('tooltip')).toMatchInlineSnapshot(`
<div
  class="tooltip"
  data-testid="tooltip"
  style="opacity: 1; z-index: 999; left: 0px; top: -15px;"
>
  Tooltip text
</div>
`);
  })

  it('on position right, should show a tooltip', async () => {
    render(<Component position={'right' as TooltipPosition}/>)
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      opacity: 0,
      zIndex: '-1'
    });
    fireEvent.mouseOver(screen.getByText(/hi/i))
    expect(screen.getByTestId('tooltip')).toMatchInlineSnapshot(`
<div
  class="tooltip"
  data-testid="tooltip"
  style="opacity: 1; z-index: 999; left: 15px; top: 0px;"
>
  Tooltip text
</div>
`)
  })
  it('on position left, should show a tooltip', async () => {
    render(<Component position={'left' as TooltipPosition}/>)
    expect(screen.getByTestId('tooltip')).toHaveStyle({
      opacity: 0,
      zIndex: '-1'
    });
    fireEvent.mouseOver(screen.getByText(/hi/i))
    expect(screen.getByTestId('tooltip')).toMatchInlineSnapshot(`
<div
  class="tooltip"
  data-testid="tooltip"
  style="opacity: 1; z-index: 999; left: -15px; top: 0px;"
>
  Tooltip text
</div>
`)
  })
})
