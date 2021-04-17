import {Spinner} from 'react-bootstrap';

const Loading = () => {
    return (
        <div className="loading">
        <div class="preloader-wrapper active">
        <div class="spinner-layer spinner-black-only">
         <div class="circle-clipper left">
        <div class="circle"></div>
        </div><div class="gap-patch">
        <div class="circle"></div>
        </div><div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  </div>
    )
}

export default Loading;