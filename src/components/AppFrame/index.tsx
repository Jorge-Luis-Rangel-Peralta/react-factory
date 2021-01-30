import React from 'react'
import { Frame } from './style'

type Props = {
    slotTools?: React.ReactNode;
    slotView?: React.ReactNode;
}

const AppFrame: React.FC<Props> = ({
    slotTools,
    slotView,
}) => (
    <Frame>
        <div>{slotTools}</div>
        <div>{slotView}</div>
    </Frame>
)

export default AppFrame
