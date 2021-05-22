import React from 'react';
import Loader from 'react-loader-spinner';

class Loading extends React.Component{
    render(){
        const {height, width, color} = this.props;
        return(
            <div
                style={{
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
           >
      <Loader type="ThreeDots" color={color} height={height} width={width} />
    </div>
        )
    }
}

export default Loading;