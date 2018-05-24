import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router/';
import { LocationService } from '../../../shared/services/location.service';
import { GroupFormComponent } from '../group-form/group-form.component';
import { UserGroup } from '../../../shared/models/userGroup/user-group';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-group-update',
  templateUrl: './group-update.component.html',
  styleUrls: ['./group-update.component.scss']
})
export class GroupUpdateComponent implements OnInit {

  @ViewChild(GroupFormComponent) formComponent;
  locationId: string;
  location: Observable<UserGroup>;
  constructor(private route: ActivatedRoute,
    private locationService: LocationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.locationId = params['id'];
    });
    this.location = this.locationService.getLocation(this.locationId);
  }

  updateLocation() {
    this.formComponent.createOrUpdate();
  }

}
