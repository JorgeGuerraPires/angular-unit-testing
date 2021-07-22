import { OrderProcessorComponent } from "./order.componenent";
import { ViewChild, Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from "@angular/core/testing";
import { By } from '@angular/platform-browser';


@Component({
  template: `
  <input type="text" placeholder="Enter stock (e.g. AAPL)"  (change)="onChangeEvent($event)">

  <order-processor [stockSymbol]="stock" [quantity]="numberOfShares"></order-processor>
  
`
})

class TestHostComponent {

  stock: string;
  readonly numberOfShares: number = 100;
  @ViewChild(OrderProcessorComponent) component: OrderProcessorComponent;
}

describe('ChildComponent', () => {
  let component: OrderProcessorComponent;
  let host: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderProcessorComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    //loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();

    host = fixture.componentInstance;
    component = host.component;
    fixture.detectChanges();
  });


  it('should create host component', () => {
    expect(component).toBeTruthy();
  });

  it('stockSymbol from child should be  equal stock from parent', () => {
    //host.stock = "Google";
    expect(childComponents()[0].stockSymbol).toBe(host.stock)
  });

  it('stockSymbol from child should be  equal stock from parent, 2', async () => {
    //host.stock = "Google";

    host.stock = "Google";

    fixture.detectChanges();
    await fixture.whenStable();

    expect(childComponents()[0].stockSymbol).toBe(host.stock)
  });


  //testing child-parent
  it('should create one child component', () => {
    expect(childComponents().length).toEqual(1);
  });


  // helper function to query all the ChildComponents
  function childComponents(): OrderProcessorComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(OrderProcessorComponent))
      .map(el => el.componentInstance);
  }




})