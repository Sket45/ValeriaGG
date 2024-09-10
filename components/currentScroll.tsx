import React, { Component } from 'react'
import CurrentScrollstyles from '../styles/CurrentScroll.module.scss'

type Props = {}

type State = {}

class currentScroll extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {}
    }

  render() {
    return (
      <div className={CurrentScrollstyles.Container}>
        <div className={CurrentScrollstyles.Container_Wrapper}>
            <div>
                <div>
                    Image
                </div>
                <h1>
                    "Colors and Pigments"
                </h1>
            </div>

            {/* <a></a> */}

            <div>
                 <h1>
                "Slow Bull"
                </h1>
                <div>
                    Image
                </div>
            </div>

            <div>
                <div>
                    Image
                </div>
                <h1>
                    "Slow Bull"
                </h1>
            </div>
            {/* <a></a> */}
            <div>
                <h1>
                "Colors and Pigments"
                </h1>
                <div>
                    Image
                </div>
            </div>
         </div>
      </div>
    )
  }
}

export default currentScroll;