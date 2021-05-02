import { Component, Input, OnInit } from '@angular/core';
import { TipsType } from 'src/app/common/enum';
import { TipsMessage } from 'src/app/models/msg.model';

@Component({
  selector: 'app-tips-message',
  templateUrl: './tips-message.component.html',
  styleUrls: ['./tips-message.component.scss'],
})
export class TipsMessageComponent implements OnInit {
  @Input() tips: TipsMessage;
  tipsType: typeof TipsType = TipsType;

  constructor() { }

  ngOnInit() { }

}