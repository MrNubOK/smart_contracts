import { NetworkErrorMessage } from "./NetworkErrorMessage"

export default function ConnectWallet({ connect, networkError, dismiss }) {
  return (
    <>
      <div>
        {networkError && (
          <NetworkErrorMessage
            message={networkError} 
            dismiss={dismiss} 
          />
        )}
      </div>

      <p>Please connect your account...</p>
      <button type="button" onClick={connect}>
        Connect Wallet
      </button>
    </>
  )
}