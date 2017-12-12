import React from 'react'
import ErrorPage from './ErrorPage'

export default function AddressErrorPage() {
  return (
    <ErrorPage>
      <h2>
        Uh-oh.<br /> We couldn&#39;t retrieve your account information.
      </h2>
      <div className="error-message">
        <p>
          We couldn&#39;t retrieve any account information associated with your
          current address. Are you using the correct address?
        </p>
        <br />
        <p>
          Remember that you to participate in the auction
          <br />you need to have MANA staked on the&nbsp;
          <a
            href="https://terraform.decentraland.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terraform Registration
          </a>
        </p>
        <br />
        <p>
          If your think this is a mistake, please please contact us using&nbsp;
          <a
            href="https://chat.decentraland.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rocket Chat
          </a>.
        </p>
        <br />
        <p>
          Confused about what&#39;s going on? Check out the&nbsp;
          <a
            href="https://wiki.decentraland.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            wiki
          </a>&nbsp; for answers.
        </p>
      </div>
    </ErrorPage>
  )
}
