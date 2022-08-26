import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
  });

  it('Criando componente', () => {
    expect(component).toBeTruthy();
  });

  it(`DOM #${PhotoFrameComponent.prototype.like.name}
    Clicar 2X no like sem sucesso. Tempo curto. Não é para passar !!!`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    component.like();
    tick(1000);
    expect(times).toBe(1);
  }));

  it(`DOM #${PhotoFrameComponent.prototype.like.name}
    Clicar 2X no like com sucesso. Tempo correto`, fakeAsync(() => {
    fixture.detectChanges();
    let times = 0;
    component.liked.subscribe(() => times++);
    component.like();
    tick(1000);
    component.like();
    tick(1000);
    expect(times).toBe(2);
  }));

  it('DOM Deve mostrar a quantidade de likes incrementada no (@input likes) ', () => {
    fixture.detectChanges();
    component.likes++;
    fixture.detectChanges();
    const element: HTMLElement =
      fixture.nativeElement.querySelector('.like-counter');
    expect(Number(element.textContent)).toBe(1);
  });

  it('DOM Atualizar o arial-label (@Input likes) quando houver incrementação', () => {
    fixture.autoDetectChanges();
    component.likes++;
    fixture.autoDetectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked');
  });

  it('DOM Deve ter 0(zeros) click no arial-label (@Input likes) quando NÃO houver incrementação', () => {
    fixture.autoDetectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });

  it('DOM Deve mostrar a imagem e a descrição. Terá erro ', () => {
    const description = 'Some description';
    const src = 'http://picsum.photos/200/300';
    component.src = src;
    component.description = description;
    fixture.detectChanges();
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });
});
