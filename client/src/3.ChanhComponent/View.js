import '../App.css';
//import {Nav} from 'reactstrap';

const View = ({  show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="details-main">
        <div class='chanh-details'>
            <img src='assets/images/logo_modal.png' height="60px" width="230px" alt='HealthCare' />
        </div>
        <section className="details-body">{children}</section>   
      </section>
    </div>
  );
};

export default View;