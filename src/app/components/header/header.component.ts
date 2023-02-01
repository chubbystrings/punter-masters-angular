import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnChanges {

  @Input() scroll: number = 0;
  headerClass = 'transition ease-in-out duration-500 py-[5px] px-[32px] md:px-[64px] lg:px-[120px] w-full bg-pri-50  flex justify-between items-center fixed top-0';
  condHeader = ''


  ngOnChanges(changes: SimpleChanges) {
    this.scroll = changes['scroll'].currentValue;
    console.log(this.scroll)
    this.condHeader =this.scroll > 0 ? 'bg-pri-bg shadow-[5px_10px_10px_0px_rgba(0,0,0,0.1)]' : 'bg-opacity-0'
  }

}
