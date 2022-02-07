import React from 'react';
import { Button } from "react-bootstrap";
export default function ConfirmAndAbort({ handleAbort, confirmLabel, abortLabel }) {
    return <div className="confirm_abort-button_div">
        <Button
            variant="primary"
            className="btn mr-3"
            type="submit"
        >
            {confirmLabel}
        </Button>
        <Button
            variant="danger"
            className="btn "
            onClick={handleAbort}>
            {abortLabel}
        </Button>
    </div>
}
