# Introduction
An introduction to build enterprise web applications with Angular.

# Application Architecture 

Angular embraces patterns, principles and practices of enterprise software development. Applying Object-Oriented Design, Domain-Driven Design or Command-Query-Responsibility-Segregation in the frontend design system, we break down complex requirements into logical boundaries. We separate business logic into layers with different concerns and vest with single responsibility.

## Frontend coupled to OOD, DDD and CQRS

The building blocks of Angular already provides us with code organisation strategies for frontend architecture. Nevertheless, to obtain a better level of abstraction we will pass Angular's Data-Driven mindset and consider higher-level strategies like Domain-Driven Design and CQRS:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/frontend_arch.PNG)

Considering multilayered architecture the question arises of how to organize layers in SPA applications? This question relates to code splitting, communication across layers and demanding business logic throughout services etc.

## Layered Architecture

Our multilayered architecture consists of the following conceptual layers:

**» Horizontal cut**<br/> Cutting the application into layers...

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/layers_hc.PNG)

*» Abstraction layers*<br/>

- Application layer: Application services, Read models, Read model repository interfaces, Event listeners <br/>
- Domain layer: Aggregates, Entities, Value objects, Write model repository interfaces <br/>
- Infrastructure layer: Write and read model repository implementations <br/>

*» Service layers* <br/>

- Stateless application services carry out full business use cases and are procedural 
- Stateless domain services carry out use cases at a higher level of granularity than entities and value objects
- Infrastructure services help to separate technical and business concepts and provide cross-cutting concerns <br/>

**» Vertical cut**<br/> Cutting the application into features / use cases...

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/layers_vc.PNG)

**» Cross cut**<br/> Cutting the application into modules...

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/layers_cc.PNG)

**» Applying DDD to Angular**<br/>

Domain-Driven Design doesn't dictate an application architecture! It demands that the complexity of the domain model is kept isolated from other layers to separate concerns 
of the application. At best the domain layer is self-contained to evolve independently. In addition, we focus on abstracting business use cases of the application.

When application services carry out full business use cases it's a good idea to put use cases with simple logic into UI controllers. However, we don't want to hide our use cases from the rest of the application. Considering using business services only for structural and behavioral modeling while domain models remain pure value containers that can't protect their invariants is a common bad practice in most Angular frontend projects. Hence, building fine-grained rich domain models is a major objective in object-oriented business applications. In general, using rich domain models means more entities than services.

It's debatable whether higher granularity distributed across multiple layers introduce extra complexity in the frontend design system. Do we really need all these tactical patterns such as factories, aggregates, domain events, repositories, domain services etc. in the frontend design system? As a consequence, many developers tend to lean toward weaker architecture patterns because they see it as an unnecessary practice. Often a simpler Data-Driven approach is sufficient enough. For most web applications MVC or Flux may be more appropriate. 

## Object-Oriented Design

**» Applying the SOLID principles**<br/>

In object orientation the SOLID principles may help to make better design decisions (high cohesion and low coupling). Applying the DIP (Dependency Inversion Principle), we ensure that layers depend on abstraction (Interfaces) as opposed to depending on concretion (Classes). 

For example, we **provide the domain layer as an abstraction by using (generic) interfaces / type aliases**.

**» Applying cross-cutting concerns**<br/>

The infrastructure layer includes cross-cutting concerns such as logging, caching or security. A naive approach to implement this functionality directly usually leads to duplicated or coupled code, which violates DRY (Don't Repeat Yourself) and SRP (Single Responsibility Principle). The AOP (Aspect Oriented Programming) promotes an abstraction and to encapsulate cross-cutting concerns by interlacing additional code, resulting in loose coupling between the actual logic and the infrastructure logic. For more information please visit: https://jaxenter.com/cross-cutting-concerns-angular-2-typescript-128925.html

# Angular strategies

Angular's design strategies such as modules, services, entities, controllers etc. helps us to support principles of Domain-Driven Design.

## Modules

It's important to maintain a clear module composition and split code into reusable blocks. A common practice in organising Angular modules is to classify them into three different categories (1) core-,  (2) feature- and (3) shared modules. The **core module** shares it's content (services) application wide as singletons. While **feature modules** encapsulate blocks of code that is not intended to be used outside that module, makes **feature modules** a good candidate for the **bounded context** pattern. **Shared modules** contain the most commonly used code to be reused in feature modules. The **root module** may have an unlimited amount of feature modules. 
That is, the entry point is the root module. 

Angular's module system allows us to pack our domain mesh into a domain-driven design context.  

**» Module architecture**<br/>

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/module_arch.PNG)

**» Examples**<br/>

`Core module`: Application wide components and services as singleton e.g. *HeaderComponent*<br/>
`Shared modules`: Highly reusable components as multiple instances e.g. *PaginatorComponent* <br/>
`Feature modules`: Custom modules such as *OrderModule* (Bounded Context) or *SalesModule* (Bounded Context) 

**» Bounded context**<br/>

The bounded context pattern in Domain-Driven Design defines areas in a domain model by decomposing a domain inside a domain. 
In a service-based environment the bounded context marks the boundaries of a service. This is similar to feature modules where we mark the boundries based on features. 
Applying the bounded context pattern to feature modules allows us to structure modules by a domain-driven approach. The following meta model 
illustrates the interaction between the bounded context pattern and feature modules:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/BoundedContext.PNG)

**» Module practices**<br/>

-	Every component, directive and pipe must belong to **one** and **only one** module.
-	**Never** re-declare these elements in another module.
-	Except services, module contents are private by default and transitive dependencies aren't visible. Use `exports` to manage visibility of private elements.
-   **Do not** share contents of a feature module, instead add reusable elements to a shared module
-   **Do not** import shared modules into the root module or core module
-   **Do not** import the core module more than once. Use dependency lookup hooks to prevent multiple instances of the core module

**» Scaffolding**<br/>

@TODO [text]
@TODO [image]

## Services
Services are elementary artifacts in Angular. Most of the functionality that does not belong in a component will be added to a service. 
Technically services are just plain TypeScript classes with business functionality. We focus on the service layers of Domain-Driven Design 
which comprises application-, domain- and infrastructure services. Angular provides a dependency injection mechanism for instantiating and bootstrapping 
the required dependencies. The constructor injection pattern is the one enforced by Angular. If we want to organize scope and lifetime 
successfully we must adhere to a few basic guidelines:

**» Services shared through the module providers array**<br/><br/>
![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/DI_Module.PNG)

**» Service practices on modules**<br/>

-	**Never export a service**: Services added to the `providers` array of a module are registered at the root of the application, making them available for injection to any class in the application. They already shared as an application wide singleton.
-	**Do not** add services to the `providers` array of a shared module. Instead create a core module with a few services and import them once into the root module.
-   Services must be registered at the root of the application, making them available to other services and associations (ServiceX uses ServiceY).
-	For lazy loaded services a different approach must be adopted. (Please see official documentation)

**» Services shared through the component providers array**<br/><br/>
![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/DI_Component.PNG)

**» Service practices on components**<br/>

-	The component `providers` array will request a service instance from the injector and shares the service class with its children as singleton.
-	If a component is instantiated more than once, a new service instance will be injected to the respective component. 
-   Use service hook decorators such as `@Host, @Optional, @Skip or @SkipSelf` to manage the dependency lookups.  

**» Service API design**<br/>

Services encapsulate business functionality and manage the shared state. The service API design depends much on the shared state! 
We relate to stateful services if we need to share data across components. Normally, simple services in Angular processes HTTP API calls that include CRUD operations. 
**A great service API exposes Observables, Subjects or BehaviorSubjects** to manage the complexity of asynchronous data-handling. Stateful services that store temporary 
data in private or even public variables may cause various issues. If we share services with other components, we must keep track of changes by applying reactive techniques 
to prevent stale data. If there is no shared state, it is a good idea to simply use a DAS (Data Access Service) and store temporary data as members of the component class.
What affects the service API design at most is the amount of data fetched from the server and reactive state management.

## Data Model Pattern  

The model in the traditional MVC pattern is a representation of application data. The model contains code to create, read, update and delete or transform model data. 
It stores the domain knowledge or business logic. The model of the MVC pattern is equal to a Repository plus Entity. There is no uniform variant of a model. 
Various patterns are available for different use cases. It is therefore advisable **not to use one pattern for everything**.
  
Angular promotes two types of models:

- `View Model`: This object represents data required by a view. It does not represent a real world object.
- `Domain Model`: This object represents data and logic related to the business domain. It represents a real world object.  

The view model and domain model may possess different schemas to keep the domain model agnostic of the view layer.

**» Implementation patterns**<br/>

- Anemic Domain Model
- Rich Domain Model

The anemic domain model is quite often used in CRUD-based web applications as data container, conform to RESTful practices. The anemic domain model, however, is considered an 
anti-pattern because it does not contain business logic except `get` and `set` (CRUD) methods and introduces a tight coupling with the UI controller. It thus follows 
that the rich domain model is a more suitable candidate for most model cases. When including a rich domain model representation in the UI controller, the **domain logic will not 
be spread across different layers multiple times**. 

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

This example illustrates the negative effect of using anemic domain models. Domain logic has to be implemented in the UI controller to calculate a rise in salary. 
A rich domain model instead hides these implementation details:

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
In the second example it becomes clear that domain logic is loosely coupled from the UI controller. Encapsulation protects the integrity of the model data.
Keeping the model as independent as possible has many advantages. It improves reusability and allows easier refactoring.
**Neither state nor business logic should be declared in the UI controller**.

By implementing a rich domain model on the client-side, we ensure that business behavior works, even without internet connection. With higher functional ability in rich domain models, we must
take the mapper pattern into account. Mapping server data to the domain model object and vice versa may be unnecessary if the model and server storage schema match.

Mapping JSON-encoded server data to the model is mandatory if:

- The domain model object defines any methods. 
- The schema in the database is different from its representation in the application.

**» Data Mapper**<br/>

The data mapper pattern transfers data between two different schemas:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/data_mapper.PNG)

Let's have a look at an example of how to map the server response schema:

```
read(): Observable<Customers[]> {
    return this.http.get<Customers[]>("/api/customers")
        pipe(
            map((customers: Customer[]) => {
                let result: Customer[] = [];
                customers.forEach((customer) => {
                    result = [new Customer(customer.firstName, customer.lastName), ...result];
                });
                return result;
            }),
            catchError(()=>{})
        );
};
```

The data mapper logic can be implemented in different components such as data access services, repositories, factories or 
even required by an abstract instance loader class. However in CQRS we manage the mapping of data queries from/to DTOs in 
dedicated command/query objects in the application layer in favor of an application service.

**» REST, HATEOAS and the Data Mapper**<br/>

When building multi-layered, distributed web applications, data transformation is among the major challenges that occur when data traverses 
all layers (data flows up and down the stack). More precisely, if the domain model resides on the client, we must transform the server 
response schema to a complex object graph: 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Mapper_Response.PNG)

For example, HAL is a hypermedia type that provides hypermedia links in the response schema so that we can make transitions 
through the application state by navigating hypermedia. However, when mapping the response schema to the domain model, it is 
important to choose a response schema that also includes data rather than just hypermedia links. We cannot map hypermedia 
links to a domain model. Many additional requests may be required; in the worst case for every resource, which can result in 
dreaded N+1 problems. It thus follows, the Web API layer not only should include hypermedia links but also data. There are many 
HATEOAS implementation patterns like the **JSON API** specification, which seems to be a good solution to the aforementioned problem. 

**» CQS vs. CQRS**<br/>
 
With traditional CRUD-based web applications, conform to the REST architectural style, we comply with the CQS (Command-Query-Separation) pattern 
and the conditions of command and query separation as methods within an entity, whereas, the CQRS (Command-Query-Responsibility-Segregation) pattern
defines commands and queries on different entities (read/write model). **If the Web API layer does not provide a CQRS-based interface, we must be prepared on the client-side to
counteract successfully by defining additional layers of abstraction**. In conjunction with CQS and REST, additional patterns should be applied:
 
![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Up_Down_Flow.PNG)
 
After mapping the response schema to the domain model, we are able to build arbitrary view models from the domain model.
An domain model object should not be presented in the view layer or sent via message-passing queues (DTO). The domain model focuses 
on invariants and use cases rather than view layer concerns. The adapter or assembler pattern enables two incompatible models to 
work together and can be implemented in the UI controller or an application service.

**» CQRS in Angular**<br/>
 
Applying CQRS and data persistence on the client-side using the HTML5 IndexedDB means separating the read side from the 
write side into different models within a bounded context and operating within one database transaction scope. A simple 
meta model of a widespread CQRS architecture serves as the basis: 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/CQRS.PNG)

In the first version, two data stores are used, one for the write side and one for the read side. In the second version, 
only one data store processes the write side and the read side within one database transaction scope. Typically state 
changes on the write side are replicated back to the read side. This process is called projection. A projection can be 
leveraged in different ways and layers. The most commonly used approach is an event-centric projection causing an 
eventually consistent system.
  
In any case, the first question asked in recognition of this should be: do we need CQRS in the frontend design system?
The complicated part and difficult undertaking in this type of frontend architecture relies on the read side. Based on 
that information, we are facing the following limitations with regards to Angular and the HTML5 IndexedDB:

- Events: No native database events.  
- Reactivity: No reactive state handling.
- Consistency: Only one database transaction scope.
- Round trips: No HTTP request cycles upon query commands. 
- Query: No native complex SQL-like queries. 
- Schema: Attributes need to be known at design time. <br/>

**» CQRS in reactive systems**<br/>

As described earlier, in the traditional server-side CQRS pattern, state changes in the write model are propagated to the 
read model by sending events. However, the client-side won't receive any notification to update it's current state. To 
achieve a greater consistency between the client- and server, we implement the following patterns: Pub-Sub, Polling, 
Optimistic Update or POST/Redirect/GET. For Angular applications that introduce CQRS in the frontend requires us to 
reexamine the projection process because Angular's change detection strategy allows us to reflect state changes in the
component's template (read model) automatically. By investigating the complex interplay between Angular's change detection 
strategy and the HTML5 IndexedDB, we need to execute and process different projection patterns.

**» Projection by Entity**<br/>

Decorating aggregates with factory methods that return different read models interplays with Angular's built-in change 
detection strategy, because it does not require us to implement an extra event system. The projection by entity pattern 
makes domain events and eventual consistency unnecessary as changes will be reflected almost simultaneously. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/VMPRO.PNG)   

Let's have a look at an example of how to keep models in sync:

```
class Order {
    private orderId: number;
    private quantity: number; 

    public getOrderForSales(): OrderForSales {
        return new OrderForSales(this.quantity);
    }

    public getOrderForCatalog(): OrderForCatalog {
        return new OrderForCatalog(this.orderId);
    }
}
``` 

An obvious caveat with this approach is that it only applies to a single entity. What if a read model requires multiple 
aggregates to please the UI concerns? Providing different read model implementations based on a write model violates 
the principle "separation of concerns" (SoC). This principle demands a clear separation between the reads and writes 
where models mutate data and views present data. By using an abstract class we could put together reusable factory 
methods that return view models:

```
abstract class OrderViewModel {
    abstract quantity;
    abstract orderId;

    public getOrderForSales(): OrderForSales {
        return new OrderForSales(this.quantity);
    }

    public getOrderForCatalog(): OrderForCatalog {
        return new OrderForCatalog(this.orderId);
    }
}

class Order extends OrderViewModel {
    private orderId: number;
    private quantity: number; 
}
``` 

To achieve a greater separation, we create read model repositories. As for the read model repositories, they provide 
different read model objects for specific use cases and use write models as a basis for the projection process. Both 
approaches interplays very well with Angular's built-in change detection strategy. The read model repositories are 
addressed in the application layer.

```
@Injectable()
class OrderForSalesRepository {
    orderRepository: OrderRepository;
    productRepository: ProductRepository;

    constructor(orderRepository: OrderRepository, productRepository: ProductRepository){
        orderRepository = orderRepository;
        productRepository = ProductRepository;
    }

    public getOrderForSales(id): OrderForSales {
        const order = this._orderRepository.getById(id);
        return new OrderForSales(order.quantity);
    }
    ...
}
``` 

**» Projection by Datasource (Materialized Views)**<br/>

@TODO [text] 
@TODO [image] 

**» Client-side Event-Sourcing and Domain-Events**<br/>

@TODO [text] 
@TODO [image] 

**» Offline First & Client-side Storage**<br/>

Complying with the **Offline First** paradigm, we must ensure that business logic works entirely offline. Modern applications should manage a 
dropped connection gracefully. Like **Progressive Web Apps** (PWA) we want offline capabilities, so that users can interact with the application 
until the network is reachable again. The HTML5 IndexedDB is a large-scale storage system with great browser support. The flexibility of 
IndexedDB when creating object stores with different schemas provides a solid ground for saving and persisting data (Aggregates) on the client-side:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/BoundedContextSync.PNG)

While Service Workers are mandatory to enable caching of assets like images or videos, we prefer offline capabilities 
build around the IndexedDB to store and synchronize data custom-made. With Angular 6 and the @angular/pwa module we have great support 
for building PWAs very easily. But we only use `asset groups` and omit `data groups` to retain control over the client cache, otherwise the PWA module will take over control 
of at which point data will be cached and retrieved from the server. The Angular 6 PWA module is not capable of caching POST requests without manual instructions.
Of course we wish to take advantage of native platform features like push notifications etc. Native features are considered as add-ons to the aforementioned 
IndexedDB approach, in which the focus is on client-side persistence as first-class citizen.

**» Multi-client systems in offline mode**<br/>

@TODO [text]
@TODO [image]

# State Management 

With Single Page Applications (SPA), we get the flexibility and cross-platform functionality of a web application as well as the 
client state management of native applications. In a SPA most of the business logic is implemented in the client and the server 
is used as an API for authentication, validation or persistence. Typically, a SPA has more complex states than traditional server-side 
applications. There are an array of different states to deal with:

Domain State | Addressable State (URL) | Draft State | Persisted State | View State | Session State | Application State |
------------|------------------|-------------|-----------------|--------------|--------------|--------------|
Domain Entity | Sort/Filter/Search | E-Mail, Comments | Database, Local Storage | Scroll-position| Cookies, Session Storage | Online/Offline|

## Domain State   

Build a domain model to manage the domain state of an application. The entity encapsulates methods, that need to operate on the data.

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

Normally, services in Angular are used to share state, beyond the lifetime of a component:

## Router Service

Angular's router service allows us to manage addressable state and view state. Simply put, the router state determines which components are visible on the screen and 
it manages navigation between application states (HATEOAS). Any state transition results in a URL change! It is very important to notice, due to the router is a resource-oriented engine, 
we **cannot place more than one component into the same location at the same time** (~Auxiliary Routes!). This means, if building a router SPA, we should desire a UX-Driven Design method 
to determine the appropriate data model and types for the Web API. The UI project should introduce User-Centered Design (UCD), where user actions define the component and URL workflow.

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Router.PNG)

It also must be ensured that routes are covered by the Web API layer, for example, do not use routes like /products/:id/edit?filter='mam', if the Web API layer
does not support query params. Always check if routes are present in the Web API layer. 

## Property Bag Service

Build a property bag service anytime a component needs to stash away some property values or for communication 
with itself or others. It offers a simple set of properties to share state. This pattern is good for retaining view state or draft state.

```
@Injectable 
export class PropertyService{
    public showPicture: boolean;
    public filterBy: string; 
}
```

## State Management Service

Build a basic state management service to share state and communicate state changes using Angular's change detection, along with the operations, 
transformations, and rules for creating, manipulating and storing that data. Use a state management service for any type of application data 
that requires state or storage management. Let's have a look at an example of how to define a state management service for a customer entity: 
           
```
@Injectable
export class CustomerService {
    private customers: ICustomer[] = [];
   
    public getCustomers(){}
    public getCustomer(id: number){}
    
    public createCustomer(customer: ICustomer){}
    public deleteCustomer(id: number){}
    public updateCustomer(customer: ICustomer){} 
    public sortCustomer(type='ASC'){}
}
```

A state management service unifies multiple DDD abstractions for the sake of simplicity. The state management logic may 
comprise data access, use cases or mapper logic. The state management service is similar to the DDD repository pattern.

**» Keep the state in sync**<br/>

Angular's change detection provides notification of any changes to state values by `getter` accessor methods, if the values are bound in the template. 
This way, we keep the state in sync. Observables, Subjects or BehaviorSubjects can help to simplify asynchronous data-handling. 
When sharing data that should always be in sync, reactive extensions are good solutions to this situation.
       
## Notification Service

One downside of sharing and binding state through services is that they are coupled to the view. Delayed changes to the state must be managed 
by asynchronous binding techniques to **keep the shared state in sync**. However, with EventEmitters, Subjects or BehaviorSubjects we share data through notifications. 
We subscribe and react to changes using notification services. Those notifications are more than just changes to bound values. 

Let's have a look at an example of how to build a notification service based on a Subject:

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

## Observable Store

We also can combine services and reactive extensions to emulate a reactive store. By referencing an in-memory object 
and emitting data anytime an action occurs, we promote a FLUX-oriented unidirectional data flow. Adding BehaviorSubjects 
allows us to notify subscribers about data changes. A FLUX-oriented pattern can be approached by 3rd-party libraries such 
as NgRx or ngrx-data, which are great in combination with RESTful APIs and anemic data models.

```
@Injectable()
export class StoreService<T> {
    private _data : BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    private _store : { data : T[] } = { data : [] };
       
    public getData(): Observable<T[]> {
        return this._data.asObservable();
    }

    public setData(data: T[]): void {
        this._store.data = [...data, ...this._store.data]
        this._data.next(Object.assign({}, this._store).data);
    }
}
```

**» Comparison**<br/>

Pattern | Store | Immutability | Debug | History | Change Notification | Binding | Root |
------------|:----------:|:-------------:|:--------------:|:--------------:|:-------:|:----------:|:----------:|
State Management Service | &cross; | &cross; | &cross; | &cross; | &cross; | &check; | &cross; |
Observable Store Service | &check; | &check; | &cross; | &check; | &check; | &check; | &check; |

## GoF State Pattern

If we need a more robust UI state management approach, the State Pattern might be a good candidate. The GoF (Gang of Four) State Pattern is an object oriented pattern to manage the 
complexity of view state transition. The State pattern uses a set of concrete classes that are derived from a base class to describe a particular state. Let's consider the following
UML-Diagram: 

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
but can be crucial to smart desktop applications. For more information about REST data aggregation please visit: https://phauer.com/2015/restful-api-design-best-practices/ 

## Navigation Patterns

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
