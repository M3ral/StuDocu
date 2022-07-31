import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import './Tooltip.scss'
import {Portal} from "react-portal";

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  text: string
  children: React.ReactElement
  position: TooltipPosition
  margin: number
}

interface getContainerPositionsProps {
  element: HTMLElement,
  tooltip: HTMLDivElement,
  position: string,
  margin: number
}


export const TooltipWrapper: React.FC<TooltipProps> = ({text, position, margin = 15, children, ...props}) => {
  const visibleTooltipState = useMemo(() => {
    return {
      opacity: 1,
      zIndex: '999'
    }
  }, [])
  const invisibleTooltipState = {
    opacity: 0,
    zIndex: '-1'
  }
  const [show, setShow] = useState(invisibleTooltipState)
  const [positionProps, setPositionProps] = useState<React.CSSProperties>()
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const attachedTo = useRef<HTMLElement | null>(null)

  const getContainerPositions = ({element, tooltip, position, margin}: getContainerPositionsProps) => {
    // getBoundingClientRect - provides information about the size of an element and its position relation to the viewport
    // offsetWidth - represent the layout width of an element
    const elRect = element.getBoundingClientRect()
    let pt: {
      [type: string]: number
    } = {
      left: 0,  // x
      top: 0, // y
    }
    switch (position) {
      case 'top' :
        pt.top = elRect.top - (element.offsetHeight + margin)
        pt.left = elRect.left + (element.offsetWidth - tooltip.offsetWidth) / 2
        break;
      case 'right' :
        pt.top = elRect.top + (element.offsetHeight - tooltip.offsetHeight) / 2
        pt.left = elRect.right + margin
        break;
      case 'left' :
        pt.top = elRect.top + (element.offsetHeight - tooltip.offsetHeight) / 2;
        pt.left = elRect.left - (tooltip.offsetWidth + margin);
        break;
      case 'bottom' :
      default:
        pt.top = elRect.bottom + margin;
        pt.left = elRect.left + (element.offsetWidth - tooltip.offsetWidth) / 2;
    }

    for (let key in pt) {
      pt[key] = Math.round(pt[key])
    }

    return pt
  }

  const setPositions = useCallback(() => {
    const props = {
      element: attachedTo.current,
      tooltip: tooltipRef.current,
      position,
      margin
    }
    setShow(visibleTooltipState)

    const positions = getContainerPositions(props as getContainerPositionsProps)
    setPositionProps(positions as any)
  }, [position, margin, visibleTooltipState])

  useEffect(() => {
    const refCurrent = attachedTo.current
    if (refCurrent) {
      refCurrent.addEventListener('mouseover', setPositions)
    }
    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener('mouseover', setPositions)
      }
    }
  }, [setPositions, attachedTo])

  const onMouseOut = () => setShow(invisibleTooltipState)

  useEffect(() => {
    if (show.opacity === 1) {
      window.addEventListener('resize', setPositions)
      window.addEventListener('scroll', setPositions)
    }

    return () => {
      if (show.opacity === 1) {
        window.removeEventListener('resize', setPositions)
        window.removeEventListener('scroll', setPositions)
      }
    }
  }, [visibleTooltipState, show, setPositions])

  return (
    <>
      {React.cloneElement(children, {
        onMouseOut,
        ref: attachedTo
      })}
      <Portal>
        <div
          ref={tooltipRef}
          className='tooltip'
          style={{...positionProps, ...show}}
          {...props}
        >
          {text}
        </div>
      </Portal>
    </>
  )
}
