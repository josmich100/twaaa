import React, { Component } from 'react'
import Loader from "react-loader-spinner";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center spinner">
        <div
        className={`loader-overlay d-flex justify-content-center flex-column align-items-center`}
      >
        <div className="loading-text text-light text-center">
          { "Loading please wait ..."}
        </div>
        <br />
        <Loader
          type= "Audio"
          color="#d5a10f"
          height="60"
          width="90"
        />
      </div>

      </div>
    )
  }
}

export default Spinner
