import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DataService } from 'src/app/core/Services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('aligner') aligner;
  view: any[];
  width: number;
  height: number;
  fitContainer: boolean;
  animations: boolean;
  colorScheme: any;
  colorSets = [
    {
      name: 'vivid',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514'
      ]
    },
    {
      name: 'natural',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3'
      ]
    },
    {
      name: 'cool',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886'
      ]
    },
    {
      name: 'fire',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00'
      ]
    },
    {
      name: 'solar',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00'
      ]
    },
    {
      name: 'air',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b'
      ]
    },
    {
      name: 'aqua',
      selectable: true,
      group: 'Continuous',
      domain: [
        '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064'
      ]
    },
    {
      name: 'flame',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738'
      ]
    },
    {
      name: 'ocean',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1'
      ]
    },
    {
      name: 'forest',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32'
      ]
    },
    {
      name: 'horizon',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0'
      ]
    },
    {
      name: 'neons',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600'
      ]
    },
    {
      name: 'picnic',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8'
      ]
    },
    {
      name: 'night',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#2B1B5A', '#501356', '#183356', '#28203F', '#391B3C', '#1E2B3C', '#120634',
        '#2D0432', '#051932', '#453080', '#75267D', '#2C507D', '#4B3880', '#752F7D', '#35547D'
      ]
    },
    {
      name: 'nightLights',
      selectable: false,
      group: 'Ordinal',
      domain: [
        '#4e31a5', '#9c25a7', '#3065ab', '#57468b', '#904497', '#46648b',
        '#32118d', '#a00fb3', '#1052a2', '#6e51bd', '#b63cc3', '#6c97cb', '#8671c1', '#b455be', '#7496c3'
      ]
    }
  ];
  single = [
    {
      name: 'Germany',
      value: 40632
    },
    {
      name: 'United States',
      value: 49737
    },
    {
      name: 'France',
      value: 36745
    },
    {
      name: 'United Kingdom',
      value: 36240
    },
    {
      name: 'Spain',
      value: 33000
    },
    {
      name: 'Italy',
      value: 35800
    }
  ];
  fieldsData = [];
  professionData = [];
  jobs = [];
  subscription: Subscription;
  constructor(private dataService: DataService) {
    this.width = 800;
    this.height = 600;
    this.fitContainer = true;
    this.animations = true;
    this.colorScheme = this.colorSets[11];
  }

  ngOnInit() {
    this.subscription = this.dataService.getMessage().subscribe(data => {
      this.dataService.getFields().subscribe(x => {
        this.fieldsData = x;
        console.log(x);
        this.single = x.map(d => {
          return { name: d.namn, value: Math.random() };
        });
      });
    });

    this.dataService.getFields().subscribe(x => {
      this.fieldsData = x;
      console.log(x);
      this.single = x.map(d => {
        return { name: d.namn, value: Math.random() };
      });
    });
    // this.dataService.getProfession().subscribe(x => { this.professionData = x; console.log(x); });
    // this.dataService.getJobPostings().subscribe(x => { this.jobs = x; console.log(x); });

    this.view = [this.width, this.height];
  }

  onLegendLabelClick(entry) {

  }

  select(data) {
    console.log('Item clicked', data);
    if (this.fieldsData.length > 0) {
      const index = this.fieldsData.findIndex(x => x.namn === data.name);
      console.log(this.fieldsData);
      if (index >= 0) {
        this.dataService.getProfession(this.fieldsData[index].id).subscribe(x => {
          this.professionData = x; console.log(x); this.fieldsData = []; this.single = x.map(d => {
            return { name: d.namn, value: Math.random() };
          });
        });
      }
      console.log('Legend clicked', data);
    } else if (this.professionData.length > 0) {
      const index = this.professionData.findIndex(x => x.namn === data.name);
      console.log(this.professionData[index].id);
      if (index >= 0) {
        this.dataService.getJobPostings(this.professionData[index].id).subscribe(x => {
          if (x) {
            this.jobs = x; console.log(x); this.professionData = []; this.single = x.map(d => {
              return { name: d.annonsurl, value: Math.random() };
            });
          } else {
            this.jobs = [{ name: 'https://www.arbetsformedlingen.se/Tjanster/Arbetssokande/Platsbanken/annonser/8003200', value: 100 }];
          }
        });
      }
    } else if (this.jobs.length > 0) {
      window.location.href = data.name;
    }
  }
}