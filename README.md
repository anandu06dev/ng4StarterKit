# Introduction
An introduction to build enterprise web applications with Angular.

# Application architecture 

Angular embraces patterns, principles and practices of Domain-Driven Design. Applying Object-Oriented Design, Domain-Driven Design and Command-Query-Responsibility-Segregation in the frontend design system, we break down complex requirements into logical boundaries and divide business logic into layers with different responsibilities to keep our code in good condition.

## Frontend coupled to DDD, OOD and CQRS

The building blocks of Angular already provides us with code organisation strategies for frontend architectures. Nevertheless, to gain a better abstraction we will bypass Angular's data-driven mindset and consider strategies like Domain-Driven Design and CQRS:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/frontend_arch.PNG)

Considering a multilayered architecture the question arises how to organize layers in an SPA application? This question refers to code splitting, communication across layers and demanding business logic through services.

## Layered architecture

Our layered architecture consists of the following conceptual layers:

**» Horizontal cut**<br/> Cutting the application into layers...

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/layers_hc.PNG)

**» Vertical cut**<br/> Cutting the application into features / use cases...

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/layers_vc.PNG)

**» Cross cut**<br/> Cutting the application into modules...

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/layers_cc.PNG)

*» Abstraction layers*<br/>

- Presentation Layer: GUI Components, Widgets
- Application layer: Use Case & UI services, Read models, Read model factories <br/>
- Domain layer: Aggregates, Entities, Value objects, Write model repository interfaces <br/>
- Infrastructure layer: Write repository implementations <br/>

*» Service layers* <br/>

- Stateful UI services coordinate UX logic and state that doesn't change the domain state
- Stateful application services carry out business use cases and are procedural 
- Stateless domain services carry out business use cases at a higher level than entities or value objects
- Infrastructure services help to separate technical and business concepts  <br/>

*» Validation layers*<br/>

- Application layer: Data types (null, undefined), format (length, empty, whitespace), schema (email, creditcard)
- Domain Layer: Business/Domain Rules, Invariants<br/>

Examples - Infrastructure Layer: *Repository, Persistence, Caching, Messaging, Crypto, Converter, Validation, Translation*<br/>
Examples - Cross-Cutting Layer: *Logging, Error, Tracing, Security, Configuration, Token, Monitoring, Date*

**» Applying DDD to Angular**<br/>

Domain-Driven Design doesn't dictate an application architecture! It demands that the complexity of the domain model is kept isolated from other layers to separate concerns 
of the application. Preferably, the domain layer is self-contained to evolve independently. Further more Domain-Driven Design focuses on abstracting business use cases of the application. Why would one implement the domain model in the frontend design system? Because frontends also evaluate business rules which must be reflected in the presentation layer. There is no question of Backend vs. Frontend. If domain-oriented logic exists, then it must also be implemented twice in different contexts.

When application services carry out business use cases, it may be a good idea to place use cases that contain less logic in UI controllers. However, we don't want to hide use cases from the rest of the application! Furthermore, we may want to share state and logic of an application service / use case with other components. 

Using business services only for structural and behavioral modeling while domain models remain pure value containers that can't protect their invariants is a common bad practice in Angular frontend projects. Hence, building fine-grained rich domain models is a major objective in object-oriented business applications. In general, using rich domain models means more entities than business services. 

It's debatable whether higher granularity distributed across many layers introduce unnecessary complexity in the frontend design system. Do we really need all tactical patterns such as factories, aggregates, domain events, repositories, domain services etc. in frontend development? As a consequence, many developers tend to lean toward weaker architecture abstraction because they see it as an unnecessary practice. Often a simpler data-driven approach is sufficient enough. For most web applications MVC or Flux may be more appropriate. Before starting using advanced concepts we have to evaluate incoming requirements and the code base!

## Object-Oriented Design

Although functional programming has gained a strong foothold in front-end development in recent years, a consistent object-oriented approach is better suited for Angular projects. Object-Oriented Design enables us to approach a more human-readable code base, where the UL (Ubiquitous language) can help to design a better taxonomy and complex data types. 

**» Applying SOLID principles**<br/>

In object orientation the SOLID principles may help to make better design decisions (high cohesion and low coupling). Applying the Dependency Inversion Principle, we ensure that layers depend on abstraction as opposed to depending on concretion. Please don't mistake DIP with LSP!

For example, we provide the domain layer as an abstraction by using interfaces / type aliases.

**» Applying cross-cutting concerns**<br/>

The infrastructure layer may include cross-cutting concerns such as logging, caching or security. A naive approach to implement this functionality directly usually leads to duplicated or coupled code, which violates Don't Repeat Yourself and Single Responsibility Principle. The Aspect Oriented Programming promotes an abstraction and encapsulation of cross-cutting concerns by interlacing additional code, resulting in loose coupling between the actual logic and the infrastructure logic. For more information about AOP in TypeScript please visit the following website: https://jaxenter.com/cross-cutting-concerns-angular-2-typescript-128925.html

# Angular strategies

Angular's design strategies such as modules, services, components etc. encourages us to comply with DDD principles.

## Modules

The Angular styleguides for organizing blocks of code names different categories. **Shared Modules** and **Widget Modules** contain the most commonly used code to be reused in domain modules, while **Domain Modules** encapsulate blocks of code, that is not intended to be used outside that module, makes **Domain Modules** a good candidate for the bounded context pattern. The **Service Module** shares it's content application wide as singletons. The **Root Module** includes multiple domain modules. That is, the entry point is the root module. For a more complete overview, visit the following website https://angular.io/guide/module-types#summary-of-ngmodule-categories

 Angular's module system gives a clean design response:  

**» Module architecture**<br/>

![alt text](https://github.com/bilgino/ng4StarterKit/blob/master/src/assets/images/module_arch.png)

**» Examples**<br/>

`Service Module`: Application wide services as singletons e.g. *TranslationService*<br/>
`Shared Module`: Highly reusable components as multitons e.g. *PaginatorComponent* <br/>
`Domain Module`: Domain modules such as *OrderModule* (Bounded Context) or *SalesModule* (Bounded Context) 

**» Module guidelines**<br/>

Following guidelines can help to facilitate the orchestration of ngModules:<br/>

-	Every component, directive and pipe must belong to **one** and **only one** module
-	**Never** re-declare these elements in another module
-	Except services, module contents are private by default and transitive dependencies aren't visible
-   **Do not** share contents of a domain module, instead add reusable elements to a shared module
-   **Do not** import shared modules into the root module
-   **Do not** import the service module more than once. Use DI lookup hooks to prevent multiple instantiation

**» Bounded context pattern**<br/>

The bounded context pattern in Domain-Driven Design divides the domain model into related domain fragments. In a service-based environment a bounded context marks the boundaries of an application service. An application service is a concretion of the bounded context pattern! This is similar to **Domain Modules** where we mark the boundries based on features. Applying the bounded context pattern to domain modules allows us to structure modules in a domain-driven approach. A bounded context should be presented at a minimum scale as an aggregate. A bounded context may consist of several aggregates! An important aspect in conjunction with SPA applications is that a (client- or server-side) bounded context must provide a REST-based API because the router engine complies with the navigatorial behaviour of hypermedia APIs. A bounded context is only coupled to the URI of the entry point resource (root), then it's hypermedia to navigate through the API e.g. `/boundedContextA/*API`; `/boundedContextB/*API`. 

The following meta model illustrates the interaction between the bounded context pattern and domain modules:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/BoundedContext.PNG)

**» Applying DDD to Angular II**<br/>

Many similarities exist when comparing the tactical patterns between Domain-Driven Design and Angular. However, there are also some technical points of friction. 
For example, the classification of a **Domain Module** is the only artifact that can be attributed to Domain-Driven Design. Other modular categories such as the **Routing Module**, **Widget Module** or **Service Module** can't be attributed to Domain-Driven Design. The **Shared Module** would be the equivalent definition of the **Cross-Cutting Module**. 

Domain-oriented layering is often considered to be the first structuring criterion, because it resolves the technical layering criterion. However, layered architecture is a building block in Domain-Driven Design, which is a good approach, even without modular encapsulation. Hence, using only abstraction layers in terms of simple folders is quite sufficient. The main reason for modular segmentation in Angular is lazy-loading or a distribution context. 

Another aspect of friction relates to visibility. Angular services are very often made available as global singleton instance, which automatically gives them technical wise a shared status. Shared singletons and modular encapsulation aren't good to work hand-in-hand.

A symbiosis of both strategies must be used:

**» Project scaffolding in the sense of DDD**<br/>

@TODO [text]
@TODO [image]

## Models 

The model in the classic MVC pattern is a representation of application data. The model contains code to create, read, update and delete or transform model data. 
It stores the domain knowledge and is very similar to the Repository pattern! The differences between the various patterns come down to the historcial 
context and abstraction of the model data: Data Model (MVC), Resource Model (REST), Domain Model (DDD), View Model (UX), Class Model (UML), Entity Model (ERM) and so forth. 
  
Angular promotes two types of models:

- `View Model`: This object represents data required by a view. It does not represent a real world object.
- `Domain Model`: This object represents data and logic related to the business domain.  

The view model and domain model should have different schemas to hold the domain model agnostic of the view.

**» Implementation patterns**<br/>

- Anemic Domain Model
- Rich Domain Model
- Input Model
- View Model 

The anemic domain model is quite often used in CRUD-based web applications as value container, conform to RESTful practices. The anemic domain model, however, is considered an 
anti-pattern because it does not contain business logic except `get` and `set` (CRUD) methods. It introduces a tight coupling with the UI controller and can't protect it's invariants. Hence, the rich domain model is a more suitable candidate. By leveraging rich domain model representations in the UI controller, we prevent **domain logic spreading across different layers multiple times**. The following example shows the negative side effect when using anemic domain models. Domain logic is coded in UI controllers: 

*»  Effects of anemic models* <br/> 
```
@Component({
    selector: 'emp',
    templateUrl: './emp.component.html'
}) class EmployeeComponent {
    @Input() emp: Employee; 

    public salaryIncreaseBy(percent:number){
         emp.salary = (emp.salary * percent / 100) + emp.salary;
    }
}
```

A rich domain model instead hides and encapsulates domain logic:

*»  Effects of rich models*<br/>
```
@Component({
    selector: 'emp',
    templateUrl: './emp.component.html'
}) class EmployeeComponent {
    @Input() emp: Employee; 

    public salaryIncreaseBy(percent:number){
         emp.salaryIncreaseBy(percent);
    }
}
```

In the second example the domain logic is loosely coupled from the UI controller. Encapsulation protects the integrity of the model data.
Keeping the model as independent as possible improves reusability and allows easier refactoring.
**Neither domain state nor domain logic should be coded in UI controllers**.

**» Mapper pattern**<br/>

By leveraging rich domain models on the client side, we ensure that business behavior works. With higher functional ability in rich domain models, we may take the Mapper pattern into account. Mapping server data to the domain model and vice versa is unnecessary if the domain model and server storage schema match.

Mapping JSON-encoded server data to the model is mandatory if:

- The domain model object defines any methods. 
- The schema in the database is different from its representation in the application.

The Mapper pattern transfers data between two different schemas:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/data_mapper.PNG)

Let's have a look at how to map the server response schema:

```
read(): Observable<Customer[]> {
    return this.http.get<Customer[]>("/api/customers")
        pipe(
            map((customer: Customer[]) : Customer[] => {
                let result: Customer[] = [];
                customer.forEach((customer) => {
                    result = [new Customer(customer.firstName, customer.lastName), ...result];
                });
                return result;
            }),
            catchError(()=>{})
        );
};
```

The data mapper is used in the repository to elaborate the correct domain model schema. 

**» Translator pattern (Mapping VM to DM and vice versa)**<br/>

@TODO [text]
@TODO [image]

**» REST, HATEOAS and the Mapper pattern**<br/>

When building multi-layered, distributed web applications, data transformation is among the major challenges that occur when data traverses 
all layers (data flows up and down the stack). Hence, if the domain model resides on the client side, we must transform the server 
response schema to a complex object graph: 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Mapper_Response.PNG)

For example, HAL is a hypermedia type that provides hypermedia links in the response schema so that we can make transitions 
through the application state by navigating hypermedia. However, when mapping the response model to the domain model, it's 
indispensable to provide a response schema that also includes data and not just hypermedia links. We can't map hypermedia 
links to a domain model! Many additional requests may be required; in a worst case scenario for every resource, which may result in the
dreaded N+1 problem. Hence, the Web API layer not only should include hypermedia links but also application data. There are many 
HATEOAS implementation patterns such as the JSON API specification, which seems to be a good solution to the aforementioned problem. 

**» Domain Model - Aggregate**<br/>

@TODO [text]
@TODO [image]

**» View Model - Input Model**<br/>

@TODO [text]
@TODO [image]

## Services

Singleton services are important artifacts in Angular applications. Most of the functionality that doesn't belong to UI components are normally placed in services! 
We will taxonomize our code base in favor of Domain-Driven Design, which embraces application-, domain- and infrastructure services. We will introduce the shared repository pattern in favor of state management services. One may get confused about the objectives and limitations between services in Domain-Driven Design and services in Angular. 

Following guidelines can help to facilitate scope and lifetime of providers:

**» Services shared through the module providers array**<br/>

-	**Never export a service**: Services added to the `providers` array of a module are registered at the root of the application, making them available for injection to any class in the application. They already shared as an application wide singleton
-	**Do not** add services to the `providers` array of a shared module, instead create a service module with a set of services and import them once into the root module
- Services must be registered at the root of the application, making them available to other services
-	For lazy-loaded modules, please see official Angular documentation

**» Services shared through the component providers array**<br/>

-	The component `providers` array will request a service instance from the injector and shares the service class with its children as singleton
-	If a component is instantiated more than once, a new service instance will be injected to the respective component
- Use dependency lookup hook decorators `@Host, @Optional, @Skip or @SkipSelf` to manage the dependency lookups 

**» Services shared through the provideIn property**<br/>

@TODO [text]
@TODO [image]

**» Stateful services vs. Stateful repositories**<br/>

As previously mentioned, it's a common practice in Angular projects to use services for business functionality or shared state. We relate to stateful services if we need to share data across components. Often simple services process HTTP requests and responses that perform CRUD operations. **We will depart from the status quo and use reactive repositories in favor of an active data store**. Technically speaking, there is no big difference! It's just a matter of convention. 

We will expand the repository pattern by the CQRS pattern to stem the heavy-lift when building complex user interfaces by introducing a repository (factory) implementation only for reactive read models. The CQRS pattern allows us to answer different use cases with the respective data model. State changes are immediately replicated back to the read side. This process is called "projection". A projection can be leveraged in many different ways or layers. The most commonly used approach is an event-based projection causing an eventually consistent system. However, we will not encounter any problems of this kind, due to Angular's (RxJS) reactive change detection behaviour. 

**A reactive API exposes hot observables (BehaviorSubjects etc.)** to manage the complexity of asynchronous data handling. If we share data with other components, we must keep track of changes by applying reactivity to prevent stale data and keep the UI in sync. Hence, we ensure "eventual consistency" that normally arises when CQRS spans the client and server side, won't occur. RxJS gives us many great tools and operators to implement the "projection phase" between the read and write side. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Reactive_Flow.PNG)

Application services provide methods for retrieving view models of domain state. However, for complex user interfaces it would be inefficient to construct view models in an application service method requiring many dependencies. By using a view model factory however, we facilitate access to view models in a more efficient manner. Consequently, the UI controller uses the application service, that in turn, uses the view model factory to provide presentation data. In return a view model factory uses all dependencies required to fulfill the presentation layer needs. It may be advantageous to use view model factories in UI controllers without an application service. It depends on the specific use case.

**» Why CQRS in the frontend?**<br/>
 
With traditional CRUD-based web applications, conform to the REST architectural style, we may fall into the situation where we have to stitch together multiple resources to build a complex view model. Often RESTful APIs are strict resource-oriented. In addition, we must transform and prepare data for the presentation layer. Even in the case of sophisticated Web APIs, it's likely to happen that we must stitch together complex view models on the client side and disjoint the view models for CUD operations. Frontend developers often implement adapter methods in UI controllers to elaborate view models, which, in the end, leads to fat and unmanagable UI controllers: 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Up_Down_Flow.PNG)

Domain model objects shouldn't be presented in the view layer or sent via message-passing queues. The domain model focuses on invariants and use cases rather than view layer concerns. Taking this to the next level. It's better to use view model repositories for the purpose of creating complex user interfaces. Creating a meaningful layer, where we accommodate the needs of the view layer and only resolve dependencies that are essential to the view properties. In complex UI flows, CQRS can help to avoid over-bloated single models for every use case scenario. A view model factory is a perfect layer to pre-compute filtering and sorting logic (https://angular.io/guide/styleguide#style-04-13). 
A challenge which is neglected by many frontend developers. 

A view model factory in the frontend design system has many advantages:

- Separating concerns of each data model and the provider API
- No eventual consistency
- Unidirectional data flow 
- Easily composing multiple API endoints 
- Immutable view models complies with the `.onPush` strategy
- Sort and filter functions can be detached from template pipes (https://angular.io/guide/styleguide#do-not-add-filtering-and-sorting-logic-to-pipes)
- Storing UI state on the server side 
- Much better testing 
 
**» Projection patterns**<br/>

The "projection by entity" pattern makes domain events and eventual consistency redundant as changes will be reflected almost simultaneously. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/VMPRO.PNG)   

Let's have a look at how to keep models in sync using static factory methods:

```
class Order {
    private orderId: number;
    private quantity: number; 

    public static getOrderForSales(): OrderForSales {
        return new OrderForSales(this.quantity);
    }

    public static getOrderForCatalog(): OrderForCatalog {
        return new OrderForCatalog(this.orderId);
    }
}
``` 

Providing view models incorporated into a domain model implementation violates the single responsibility rule. 
By using an abstract class we can merge reusable static factory methods:

```
abstract class OrderViewModel {
    abstract quantity;
    abstract orderId;

    public static getOrderForSales(): OrderForSales {
        return new OrderForSales(this.quantity);
    }

    public static getOrderForCatalog(): OrderForCatalog {
        return new OrderForCatalog(this.orderId);
    }
}

class Order extends OrderViewModel {
    private orderId: number;
    private quantity: number; 
}
``` 

An obvious problem here is that this only works for a single entity. What if a view model demands multiple sources? 
When building complex user interfaces that require multiple aggregates, we will encounter problems very quickly, if we don't prepare additional layers.
As for the shared view model repositories, they may provide different view model schemas for different use cases and combine multiple data- or action-streams. 

```
@Injectable()
class OrderForSalesRepository {

    order: OrderForInitialisation = OrderFactory.empty();
    
    constructor(
      private orderRepository: OrderRepository, 
      private productRepository: ProductRepository, 
      private productSelected : ProductSelected,
      private dateService: DateService){
    }

    public static getOrderForSales(id): Observable<OrderForSales> {
        return this._orderRepository.getById(id).pipe(
          map(),
          filter(),
          mergeMap(()=>{
             return of(new OrderForSales(order.quantity));
          })
        )
    }
    
    public static getOrderForProductSales(id): Observable<OrderForProductSales> {
        return combineLatest(this._orderRepository.getById(id), this._productRepository.getById(id)).pipe(
          map() => {
              let order.date = this.dateService.now();
              return order;
          }),
          filter() => order.cancel === !order.cancel),
          mergeMap() => {
            return of(new OrderForProductSales(order.quantity, product.price));
          }),
          shareReplay(1)
        )        
    }
    ...
}
``` 

# State Management 

With Single Page Applications (SPA), we get the flexibility and cross-platform functionality of a web application as well as the 
client state management of native applications. In a SPA most of the business logic is implemented in the client and the server 
manages authentication, validation or persistence. Typically, a SPA has more complex states than traditional server-side 
applications. In Angular applications, services are usually used to share state beyond the lifetime of a component. 

There are an array of different state types to deal with:

Domain State | Addressable State (URL) | Draft State | Persisted State | View State | Session State | Application State |
------------|------------------|-------------|-----------------|--------------|--------------|--------------|
Entity | Sort/Filter/Search | E-Mail, Comments | IndexedDB, Local Storage | Scroll-position| Cookies, Session Storage | Online/Offline|

## Domain State   

Create an entity to store the domain state of the application. The entity encapsulates methods, that need to operate on the data.

```
class Customer {
    private firstName: string;
    private lastName: string;
        
    get firstName(){}
    set firstName(){}
    get lastName(){}
    set lastName(){}
    
    public isLoggedIn(){}
}
``` 

## Router State

Angular's router service allows us to manage addressable state and UI state. Simply put, the router state determines which components are visible on the screen and 
it manages navigation between application states (HATEOAS). Any state transition results in a URL change! It is very important to notice, due to the router is a resource-oriented engine, we **cannot place more than one component into the same location at the same time** (~Auxiliary Routes!). This means, if building a router SPA, we should blend with UX-Driven Design to determine the appropriate data models for the Web API interface. The UI project should comply with User-Centered Design (UCD), where user actions define the URL workflow.

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Router.PNG)

In Addition to this, we must ensure that routes are provided by the Web API layer. For example, don't use routes like /products/:id/edit?filter='mam', if the Web API layer
doesn't support query params. Always check if routes are represented by the Web API layer! 

## UI State

Build a UI service anytime a component needs to stash away some property values or for communication with itself or others (action stream). 
It offers a simple set of properties to share state. This pattern is good for retaining view state or draft state.

```
@Injectable 
export class UIService{
    public showPicture: boolean;
    public filterBy: string; 
}
```

## Repository (State Management Service)

Build a reactive repository to share state and communicate state changes using RxJS reactive operators, along with the operations, 
transformations, and rules for creating, manipulating and storing that data. Let's have a look at how to define a basic repository for the customer domain: 
           
```
@Injectable
export class CustomerRepository {
    private customers: ICustomer[] = [];
   
    public getCustomers(){}
    public getCustomer(id: number){}
    
    public createCustomer(customer: ICustomer){}
    public deleteCustomer(id: number){}
    public updateCustomer(customer: ICustomer){} 
    public sortCustomer(type='ASC'){}
}
```

## Reactive Repository

We use reactive extensions to create a shared reactive repository. By referencing an in-memory object and emitting data anytime an action occurs, we embrace a unidirectional data flow. Using BehaviorSubjects allows us to notify subscribers about state changes. 

```
@Injectable()
export class DomainModelRepository<T> {
    private _data : BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
       
    public getData(): Observable<T[]> {
        return this._data.asObservable();
    }
}
```

**» Keep the state in sync**<br/>

Angular's change detection provides notification of any changes to state values by `getter` accessor methods, if the values are bound in the template. 
This way, we keep the state in sync. Observables, Subjects or BehaviorSubjects can help to simplify asynchronous data-handling. 
When sharing data that should always be in sync, reactive extensions are good solutions to this situation.
       
## Application-, Domain- and Infrastrucutre service

One downside of sharing and binding state through services is that they are coupled to the view. Delayed changes to the state must be managed 
by asynchronous binding techniques to **keep the shared state in sync**. However, with EventEmitters, Subjects or BehaviorSubjects we share data through notifications. 
We subscribe and react to changes using notification services. Those notifications are more than just changes to bound values. 

Let's have a look at how to build a notification service based on a Subject:

```
@Injectable()
export class NotificationService {
    private _subject = new Subject<any>();
 
    public notify(news: string): void {
        this._subject.next({ news: news });
    }
 
    public listen(): Observable<any> {
        return this._subject.asObservable();
    }

    public complete(): void {
        return this._subject.complete();
    }
}
```

**» Comparison**<br/>

Pattern | Store | Immutability | Debug | History | Change Notification | Binding | Root |
------------|:----------:|:-------------:|:--------------:|:--------------:|:-------:|:----------:|:----------:|
State Management Service | &cross; | &cross; | &cross; | &cross; | &cross; | &check; | &cross; |
Reactive Repository | &check; | &check; | &cross; | &check; | &check; | &check; | &check; |

## GoF State & Strategy pattern

If we need a more robust UI state management approach, the State pattern might be a good candidate. The GoF (Gang of Four) State pattern is an object oriented pattern to manage the complexity of view state transition. The State pattern uses a set of concrete classes that are derived from a base class to describe a particular state. Let's consider the following UML-Diagram: 

@TODO [image]

# Component Tree Design

When developing a single page application based on the router module, we should primarily think of the component hierarchy and sketch 
wireframes alongside the component tree. That way, we can easily approach a UX-Driven API design. The top-down flow ensures that the GUI 
storyboard is compatible with the resource representation enforced by RESTful practices. By mapping a GUI storyboard to the component tree 
we are able to identify full business use cases. The following phase model will be used as a basis:

`Information Architecture` &rarr; `Interaction Design` &rarr; `Visual Design` &rarr; `Usability Testing`

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/component_tree.PNG)

Almost conform to REST and HATEOAS, we notice a clear navigation path which makes it considerable to map wireframes to the component tree. 
It is obvious that this approach does not comply with a DDD task-based UI projection because the router configuration is tide coupled to HATEOAS.
Moreover, while with task-based UI components we expect appropriate view models, the HATEOAS approach provides us with CRUD-based resource models. 
Very often service providers create RESTful Web APIs, where clients have to stitch data together by themselves. In order to satisfy UX requirements 
it is not feasible to prepare read models for every client's use case! In this context a HATEOAS approach is excellent for mobile devices and CRUD-based applications, 
but can be crucial to smart desktop applications. For more information about REST and data aggregation visit the following website: https://phauer.com/2015/restful-api-design-best-practices/ 

## Navigation patterns

As layout complexity increases with screen resolution, it requires careful considerations when starting from a mobile-first approach 
and scaling up to desktop layouts. Traditional desktop layouts require more complex interaction and navigation patterns because UX engineers 
normally address usability problems at first place and do not take into account any RESTful practices. As mentioned before, the 
router engine is a resource-oriented engine (HATEOAS) with which we have limited possibilities regarding arbitrary navigation patterns. 
The most commonly used navigation patterns are: 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Master2Details.PNG)

With the master-master and master-details patterns we comply with RESTful resource association and resource aggregation 
with reference to one and only one component. Indeed secondary (Auxiliary) and pathless (Master-Children) routes allows us 
to initiate multiple components in parallel, but bringing limitations and sacrifices to a special syntax that does not comply 
with RESTful practices. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Master2Aux.PNG)

Pathless or componentless routes are a good way to share data between sibling components. This kind of routes provide a way
to load multiple components at a time. However, deep-linking is not supported how it should be. It exists a hack to enable 
deep-linking to some extend. This is achieved by checking route params in named router outlets or by intervening with
Resolvers or Route Guards. If specific invariants evaluate to true, we will display the component:

`<router-outlet *ngIf="id==='22'" name='employee'></router-outlet>` 

The pathless strategy is not well documented, especially when it comes to deep-linking it leads to unexpected behavior.
Secondary (Auxiliary) routes should be addressed in any use case that requires a few components to be initiated in 
parallel at random places. The router module is therefore well suited for mobile related navigation patterns. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Notebook.PNG)

# Summary

With multi-layered applications it is clear that critical decisions have to be made regarding technical aspects at the micro-level. 
Most of them are determined by the requirements at the macro-level, which includes decisions on the scope of:

- SPA vs. MPA
- REST vs. DDD
- UX vs. API first
- Smart vs. Dump client
- Public vs. Private Web API
- Mobile vs. Desktop first
- Offline vs. Online first
- Functional vs. Object-oriented 

# Project Structure [src]

The directory structure does not follow the recommended application structure of Angular CLI.
It is designed for Single Page Applications (SPA) as well as Multi Page Applications (MPA). 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Scaffolding.png)


Bibliography:

- Yakov Fain; Angular with TypeScript - 2nd; Manning Publications; Mart 21, 2019. 
- Victor Savkin; Angular Router; Packt Publishing; Mart 20, 2017. 
- Cornelia Davis; Cloud Native Patterns; Manning Publications; May 22, 2019.

- Deborah Kurata; Pluralsight; Jan 30, 2018; Accessed September 12, 2018. <br/>
https://www.pluralsight.com/courses/angular-component-communication.
- Deborah Kurata; Pluralsight; Aug 20, 2019; Accessed August 26, 2019. <br/>
https://www.pluralsight.com/courses/angular-routing
- Thomas Rundle; medium.com; Nov 4, 2016; Accessed August 12, 2018. <br/>
https://medium.com/@ct7/angular2-module-architecture-and-example-seed-project-35b7410264f5
