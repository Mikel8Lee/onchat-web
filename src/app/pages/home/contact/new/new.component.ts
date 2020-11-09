import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FriendRequestStatus } from 'src/app/common/enum';
import { GlobalDataService } from 'src/app/services/global-data.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
  friendRequestStatus: typeof FriendRequestStatus = FriendRequestStatus;

  constructor(
    public globalDataService: GlobalDataService,
    private socketService: SocketService,
    private overlayService: OverlayService,
  ) { }

  ngOnInit() { }

  friendRequestAgree(friendRequestId: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.overlayService.presentAlert({
      header: '同意申请',
      confirmHandler: (data: KeyValue<string, any>) => {
        this.socketService.friendRequestAgree(friendRequestId, data['selfAlias'] || undefined);
      },
      inputs: [{
        name: 'selfAlias',
        type: 'text',
        placeholder: '顺便给对方起个好听的别名吧',
        cssClass: 'ipt-primary',
        attributes: {
          maxlength: 30
        }
      }]
    });
  }

  friendRequestReject(friendRequestId: number) {
    this.overlayService.presentAlert({
      header: '拒绝申请',
      confirmHandler: (data: KeyValue<string, any>) => {
        this.socketService.friendRequestReject(friendRequestId, data['rejectReason'] || undefined);
      },
      inputs: [{
        name: 'rejectReason',
        type: 'textarea',
        placeholder: '或许可以告诉对方你拒绝的原因',
        cssClass: 'ipt-primary',
        attributes: {
          rows: 4,
          maxlength: 50
        }
      }]
    });
  }

}
