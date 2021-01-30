import React from 'react'
import { Frame, ViewFrame } from './style'

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
        <ViewFrame>{slotView}</ViewFrame>
    </Frame>
)

export default AppFrame
