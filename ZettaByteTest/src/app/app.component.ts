import { Component, Input } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Groups, IAlert } from '../Models/Groups';
import { Teams } from '../Models/Teams';
import { TeamMembers } from '../Models/TeamMembers';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  closeResult: string;
  ZetaGroup: Groups[];
  Teams: Teams[];
  TeamMembers: TeamMembers[];
  GroupModel: Groups = new Groups();
  AlertMessage: string = "";
  isAlertRequired: boolean = false;
  processing: boolean = false;
  @Input()
  public alerts: Array<IAlert> = [];

  constructor(private _http: Http, private modalService: NgbModal) {

  }
  ngOnInit() {
    this.getGroups()
      .subscribe(x => {
      this.ZetaGroup = x;
      });
    this.getTeams()
      .subscribe(x => {
      this.Teams = x;
      });
    this.getTeams()
      .subscribe(x => {
      this.TeamMembers = x;
      });
  }
  open(content) {
    console.log(content);
    this.modalService.open(content);
  }
  getGroups() {
    return this._http.get("https://team-management-ghclxtoitp.now.sh/group")
      .map(x => x.json());
  }
  getTeams() {
    return this._http.get("https://team-management-ghclxtoitp.now.sh/team")
      .map(x => x.json());
  }
  getTeamMembers() {
    return this._http.get("https://team-management-ghclxtoitp.now.sh/teamMember")
      .map(x => x.json());
  }
  saveGroup() {
    if (!this.GroupModel.name) {
      this.AlertMessage = "Please enter group name";
    }
    else {
      this.AlertMessage = "";
      this.CreateGroup().subscribe(x => {
        alert("Group has been saved successfully");
        this.processing = false;
      },
        err => {
          alert("An error occurred while processing your request.");
          this.processing = false;
        });
    }

  }

  private CreateGroup() {
    this.processing = true;
    return this._http.post("https://team-management-ghclxtoitp.now.sh/group", this.GroupModel)
      .map(x => x.json());
  }
}
