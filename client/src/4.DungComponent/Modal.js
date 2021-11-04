import '../App.css';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div class='dung-logomini'>
            <h5><img src='assets/images/Logo.png' height="25%" width="25%" alt='HealthCare' />HealthCare</h5>
        </div>
        {children}
        <button type="button" onClick={handleClose}>
          Hủy
        </button>
        <button type="button" onClick={handleClose}>
          Xác nhận
        </button>
      </section>
    </div>
  );
};

export default Modal;