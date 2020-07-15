import { KeyValue } from '@angular/common';
import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  /**
   * 弹出文字Toast
   * @param message 文字
   */
  async presentMsgToast(message: string, duration: number = 2000): Promise<HTMLIonToastElement> {
    const toast = await this.toastController.create({
      message,
      duration,
      color: 'dark'
    });

    toast.present();
    return toast;
  }

  /**
   * 弹出文字提示框
   * @param header 标题
   * @param message 提示文字
   * @param confirmHandler 确认时的回调函数
   * @param cancelHandler 取消时的回调函数
   */
  async presentMsgAlert(header: string, message: string, confirmHandler: CallableFunction, cancelHandler?: CallableFunction) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: '取消',
          handler: () => { cancelHandler && cancelHandler(); }
        }, {
          text: '确认',
          handler: () => confirmHandler()
        }
      ]
    });

    alert.present();
    return alert;
  }

  /**
   * 弹出带有Input的文字提示框
   * @param header 标题
   * @param inputs inpust组
   * @param confirmHandler 确认时的回调函数
   * @param cancelHandler 取消时的回调函数
   */
  async presentInputAlert(header: string, inputs: any[], confirmHandler: CallableFunction, cancelHandler?: CallableFunction): Promise<HTMLIonAlertElement> {
    const alert = await this.alertController.create({
      header,
      inputs,
      buttons: [
        {
          text: '取消',
          handler: () => { cancelHandler && cancelHandler(); }
        }, {
          text: '确认',
          handler: (data: KeyValue<string, any>) => confirmHandler(data)
        }
      ]
    });

    alert.present();
    return alert;
  }

}