import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupFormComponent } from '../group-form/group-form.component';
import { Router } from '@angular/router/';
import { UserGroup } from '../../../shared/models/userGroup/user-group';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss']
})
export class GroupCreateComponent implements OnInit {

  @ViewChild(GroupFormComponent) formComponent;
  group: UserGroup;
  constructor(private router: Router) { }

  ngOnInit() {
    this.group = {
      id: null,
      name: '',
      isActive: true,
      check: false
    }
  }

  createGroup() {
    this.formComponent.createOrUpdate();
  }

}
