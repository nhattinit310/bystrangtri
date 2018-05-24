import { Injectable } from '@angular/core';
import { AccountRequest } from '../models/api-request/account-request';
import { Account } from '../models/accounts/account';
import { Status } from '../common/status.enum';
import { AccountResponse } from '../models/api-response/account-response';
import { PermissionArr } from '../common/default-permission';
import { Permission } from '../models/accounts/permission';
import { UserGroup } from '../models/userGroup/user-group';
import { LocationRequest } from '../models/api-request/location-request';
import { LocationResponse } from '../models/api-response/location-response';
import { NoticeRequest } from '../models/api-request/notice-request';
import { Notice } from '../models/notice/notice';
import * as moment from 'moment';
import { NoticeResponse } from '../models/api-response/notice-response';
import { CommentResponse } from '../models/api-response/comment-response';

@Injectable()
export class ApiConvertHelper {

    formatDate = 'DD/MM/YYYY';
    formatDateTime = 'DD/MM/YYYY HH:mm';
    formatTime = 'HH:mm';

    convertToTimeSpan(date: string): string {
        return moment(date, this.formatDate).format("x").toString();
    }

    convertDatetimeToTimeSpan(date: string): string {
        return moment(date, this.formatDateTime).format("x").toString();
    }

    convertToDate(unix_timestamp: number): string {
        return moment(unix_timestamp).format(this.formatDate).toString();
    }

    convertToDatetime(unix_timestamp: number): string {
        return moment(unix_timestamp).format(this.formatDateTime).toString();
    }

    convertToTime(unix_timestamp: number): string {
        return moment(unix_timestamp).format(this.formatTime).toString();
    }


    AccountRequestConvert(model: Account): AccountRequest {
        const result = new AccountRequest();
        if (model.id) {
            result.id = model.id;
        }
        result.customerId = model.isClient ? Number.parseInt(model.client) : null;
        result.email = model.email;
        result.firstName = model.firstName;
        result.isActive = model.status == Status.Active ? true : false;
        result.lastName = model.lastName;
        result.locationId = model.groupId;
        result.password = model.password;
        result.permissions = [];
        model.permission.forEach(e => {
            if (e.value) {
                result.permissions.push(e.name);
            }
        });
        result.userName = model.userName;
        return result;
    }

    AccountConvert(model: AccountResponse): Account {
        const result = new Account();
        if (model.id) {
            result.id = model.id;
        }
        result.client = model.customer ? model.customer.id.toString() : '';
        result.isClient = model.customer ? true : false;
        result.email = model.email;
        result.firstName = model.firstName;
        result.group = model.location ? model.location.locationName : '';
        result.groupId = model.location ? model.location.id : 0;
        result.lastName = model.lastName;
        // result.number
        // result.password
        result.permission = [];
        PermissionArr.forEach(data => {
            const pms = new Permission();
            pms.name = data.name;
            pms.text = data.text;
            if (model.permissions.find(p => p == data.name)) {
                pms.value = true;
            } else {
                pms.value = false;
            }
            pms.showWithClient = true;
            result.permission.push(pms);
        });
        result.status = model.isActive ? Status.Active : Status.UnActive;
        result.userName = model.userName;
        return result;
    }

    LocationRequestConvert(model: UserGroup): LocationRequest {
        const result = new LocationRequest();
        if (model.id) {
            result.id = model.id;
        }
        result.locationName = model.name;
        result.isActive = model.isActive;

        return result;
    }

    UserGroupConvert(model: LocationResponse): UserGroup {
        const result = new UserGroup();
        result.id = model.id;
        result.name = model.locationName;
        result.isActive = model.isActive;

        return result;
    }

    NoticeRequestConvert(model: Notice): NoticeRequest {
        const result = new NoticeRequest();
        result.title = model.title;
        result.content = model.content;
        result.locationId = model.locationId;

        return result;
    }

    NoticeConvert(model: NoticeResponse): Notice {
        const result = new Notice();
        result.title = model.title;
        result.content = model.content;
        result.created = (model.createdDate * 1000) - 25200000;
        result.locationName = model.locationName;
        return result;
    }

    CommentResponseConvert(model: CommentResponse): CommentResponse {
        const result = new CommentResponse();
        result.authorUser = model.authorUser;
        result.content = model.content;
        // const cD = moment.utc(model.createdDate * 1000).format('DD/MM/YYYY HH:mm');
        // result.createdDate = moment(cD).valueOf();
        result.createdDate = (model.createdDate * 1000) - 25200000;
        return result;
    }
}
