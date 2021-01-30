import React from 'react'

const bar = (position: number) => {
    const baseX = position * 10
    return (
        <>
            <rect
                stroke="#717171"
                id="svg_1"
                height="100%"
                width="10"
                y="0"
                x={baseX}
                stroke-width="1"
                fill="transparent"
            />
            <polygon
                points={`${baseX+2},25 ${baseX+2},35 ${baseX+8},30`}
                fill="#717171"
                stroke="#717171"
                stroke-width="1"
            />
        </>
    )
}

const SVGConveyor = () => (
    <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
    >
        {bar(0)}
        {bar(1)}
        {bar(2)}
        {bar(3)}
        {bar(4)}
        {bar(5)}
    </svg>
)

export default SVGConveyor
