import React from 'react'

export default function UserPremissions({ premissions, id }) {
    return (
        <div>
            <ul>
                {premissions.map(premission => {
                    return <li key={`${id}${premission}`}> {premission}</li>
                })}
            </ul>
        </div>
    )
}
