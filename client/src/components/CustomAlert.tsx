import Swal, { SweetAlertResult, SweetAlertIcon } from 'sweetalert2';

interface AlertProp {
  title: string;
  icon?: SweetAlertIcon;
  didCloseCallback?: Function
}

function CustomAlert(prop: AlertProp): Promise<SweetAlertResult<any>> {
  return Swal.fire({
    title: prop.title,
    icon: prop?.icon,
    confirmButtonText: '확인',
    didClose: () => prop.didCloseCallback
  });
}

export default CustomAlert;