# Angular Project Starter 
An introduction to building large-scale web applications with Angular.

# Application Architecture 

Angular is in perfect harmony with patterns, principles and practices of enterprise software development for complex needs. 
Applying methodologies and principles of Object-Oriented Design (OOD), Domain-Driven Design (DDD) and the Model View Controller 
(MVC) architecture, we break down complex business requirements into logical boundaries. Angular promotes the SOLID principles that any 
project should welcome in order to be maintainable and extensible. Applying patterns means high cohesion and low coupling. 
We separate business logic into layers with different responsibilities.

## Frontend coupled to the MVC

The building blocks of Angular enables us to apply enterprise software patterns to the frontend design system:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Front_End_MVC_MIN.png)

Angular embraces the Model View Controller (MVC) pattern and Object-Oriented Design (OOD) by adopting TypeScript. When considering the 
conceptual layers of Domain-Driven Design, the question arises how to apply these layers to Angular applications? This question relates to 
code organizational structure, communication across layers and demanding services through dependency injection. 

## Layered Architecture

A typical DDD architecture consists of the following conceptual layers:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/DDD_Layer.PNG)

**» Differentiating the service layers**<br/>

- Application services carry out full business use cases and are procedural as well as stateless. 
- Domain services carry out use cases at a higher level of granularity than entities and value objects and are stateless.
- Infrastructure services help to separate technical and business concepts and provide cross-cutting concerns.

**» Applying the SOLID principles**<br/>

In object orientation the SOLID principles can help to make better design decisions in terms of high cohesion and low coupling.
Applying the DIP (Dependency Inversion Principle), we ensure these layers depend on abstraction (interfaces) as opposed to depending on concretion (classes). 
For example, we **provide the domain layer as abstraction by using (generic) interfaces**.

**» Applying cross-cutting concerns**<br/>

The infrastructure layer includes cross-cutting concerns such as logging, caching or security. A naive approach to implement this functionality directly usually leads to duplicated or coupled code, 
which violates DRY (Don't Repeat Yourself) and SRP (Single Responsibility Principle). The AOP (Aspect Oriented Programming) promotes to abstract and encapsulate cross-cutting concerns by 
interlacing additional code, resulting in loose coupling between the actual logic and the infrastructure logic. For more information please visit: https://jaxenter.com/cross-cutting-concerns-angular-2-typescript-128925.html

**» Applying DDD layers to Angular**<br/>

Domain-Driven Design does not dictate an application architecture. It demands that the complexity of the domain model is kept isolated from other layers to separate concerns of the application. 
At best the domain layer is self-contained to evolve independently. It is arguable whether additional granularity distributed across several layers in particular communication across these layers, 
creates an unnecessary load on the frontend. Moreover, Angular services are usually reactive stateful, whereas services in Domain-Driven Design are stateless!

When application services carry out full business use cases, very often multiple actions are performed in a transactional way. It thus follows, they succeed or fail together! 
In case of not all interactions with the database succeeds, application services must execute a rollback (on the client). This may become excessively complex and leads to 
the question of whether full business use cases should be performed in the frontend at all? The usage of application services is arguable, it may be a good idea 
to put full business use cases with simple coordination logic directly into the UI controller, so that the UI controller takes the responsibility for orchestrating full 
business use cases. For reusability improvements we should target application services. Simply put, **only apply Domain-Driven Design when applicable** 
and focus on layers to separate technical from business concerns.

# Application Artifacts
Angular intrinsically provides artifacts, which makes it easy to apply patterns of DDD such as modules, controllers, factories, services or entities.

## Modules
The module system modularize code into reusable blocks. The application can contain multiple modules of different types, but the entry point is 
the root module! If working with the module system it is essential to architect a clear module structure. While **feature modules** encapsulate 
blocks of code that is not intended to be used outside that module, makes feature modules a good candidate for the **bounded bontext** pattern. 
**shared modules** contain the most commonly used code to be reused as pleased. The **root module** can contain an unlimited amount 
of feature modules. The **core module** shares its content application wide as singleton.

**» Module Organisation**<br/>

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Module_Structure.PNG)

**» Examples**<br/>

`Core module`: Application wide components and services as singleton e.g. *HeaderComponent*<br/>
`Shared modules`: Highly reusable components as multiple instances e.g. *PaginatorComponent* <br/>
`Feature modules`: Custom modules such as *OrderModule* (bounded context) or *SalesModule* (bounded context) 

**» Bounded Context**<br/>

The bounded context pattern in Domain-Driven Design defines areas in a domain model and decomposes a domain within a domain. 
In a service-based environment a bounded context marks the boundaries of services. Similar to feature modules in Angular we 
structure code into domain contexts. Feature modules are reusable units and comply with the **micro frontend** pattern. In Domain-Driven 
Design these blocks are considered areas of a domain model. Mapping bounded contexts to feature modules allows us to structure modules 
in a domain driven context. The following image shows the interaction between bounded contexts and feature modules:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/BoundedContext.PNG)

**» Module Guidelines**<br/>

-	Every component, directive and pipe must belong to **one** and **only one** module.
-	**Never** re-declare these elements in another module.
-	Except services, module contents are private by default. Use `exports` to manage visibility for private elements.
-   **Do not** share contents of a feature module, instead add reusable elements to a shared module.
-   **Do not** import shared modules into the root module or core module.
-   **Do not** import the core module more than once. Apply service hooks in the constructor `constructor(@Optional() @SkipSelf() ...)` to prevent multiple instances.
-   To use existing services across feature modules **and** the root module, define `.forRoot()` and `.forChild()` as static methods in the module class definition. 
This is common for libraries that require a single service instance. The RouterModule is an example for this use case.

## Services
Services are elementary constructs in Angular. Almost any functionality that does not belong in a component will be placed in a service. 
Technically services are just plain TypeScript classes with a defined functionality. We focus on the service layer of Domain-Driven Design 
which comprises application-, domain- and infrastructure services. Angular provides a dependency injection mechanism for instantiating and bootstrapping 
the required dependencies. The constructor injection pattern is the one enforced by Angular. If we want to organize scope and lifetime 
successfully we must adhere to a few basic guidelines:

**» Services shared through the module providers array**<br/><br/>
![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/DI_Module.PNG)

**» Service notes on modules**<br/>

-	**Never export a service**: Services added to the `providers` array of a module are registered at the root of the application, making them available for injection to any class in the application. They already shared as an application wide singleton.
-	**Do not** add services to the `providers` array of a shared module. Instead create a core module composed of services (service collection) and import them once into the root module (AppModule).
-   To control the resolution of service associations (Service A uses Service B), services must be registered at the root of the application, making them available to other services.
-	For lazy loaded services another rule applies. (Please see official documentation)

**» Services shared through the component providers array**<br/><br/>
![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/DI_Component.PNG)

**» Service notes on components**<br/>

-	The component `providers` array will request a service instance from the injector and shares the service class with its children as singleton.
-	If a component is instantiated more than once, a new service instance will be injected to the respective component. 
-   To control the resolution of the dependency tree use `@Host, @Optional or @SkipSelf` decorators (Service hooks).

**» Service API design**<br/>

Services encapsulate business functionality and handle the shared context. The service API design depends much on the shared context! 
We relate to stateful services if we need to share data across components. Normally, simple services in Angular processes HTTP API calls that include CRUD operations. 
**A great service API exposes Observables, Subjects or BehaviourSubjects** to manage the complexity of asynchronous data-handling. Stateful services that store temporary 
data in private or even public variables may cause various issue. If we share services with other components, we must keep track of changes by applying reactive techniques 
to prevent stale data. If there is no shared context, it is a good idea to simply use a Data Access Service (DAS) and store temporary data as properties in the component classes.
Factors that affect the service API design at most is the amount of data fetched from the server.

## Model Pattern  

The model of the MVC pattern is a representation of application data. The model contains code to create, read, update and delete or transform model data. 
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
anti-pattern because it does not contain business logic except `get` and `set` (or CRUD) methods and introduces a tight coupling with the UI controller. It thus follows 
that the rich domain model is a more suitable candidate for most model cases. When including a rich domain model representation in the UI controller, the **domain logic will not 
be spread across different layers multiple times**. 

*»  Effects of anemic models* <br/> 
```
@Component({
    selector: 'emp',
    templateUrl: './emp.component.html'
}) class EmployeeComponent {
    @Input() emp: Employee; 

    salaryIncreaseBy(percent:number){
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

    salaryIncreaseBy(percent:number){
         emp.salaryIncreaseBy(percent);
    }
}
```
In the second example it becomes clear that domain logic is loosely coupled from the UI controller. Encapsulation protects the integrity of the model data.
Keeping the model as independent as possible has many advantages. It improves reusability and allows easier refactoring.

**By implementing a rich domain model on the client-side, we ensure that business behaviour works, even without internet connection**. With higher functional ability in rich domain models, we must
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
            map((customers: Array<unknown>) => {
                let result: Array<Customers> = [];
                customers.forEach((customer) => {
                    result = [new Customer(customer.firstName, customer.lastName), ...result];
                });
                return result;
            }),
            catchError(()=>{})
        );
};
```

The data mapper logic can be placed in different locations such as a data access service, domain service or repository. However in DDD and CQRS we 
handle the mapping of data queries from/to a DTO in dedicated Command/Query objects in the application layer in favor of an application service.

**» REST, HATEOAS, HAL, JSON API & Data Mapper**<br/>

When building multi-layered, distributed web applications, data transformation is among the major challenges that occur when data traverses 
all layers (data flows up and down the stack). More precisely, if the domain model resides on the client, we must transform the server 
response schema to a complex object graph: 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Mapper_Response.PNG)

For example, HAL is a hypermedia type that offers hypermedia links in the response schema, so that we can make transitions 
through the application state by navigating hypermedia. However, we have to map the resource model schema to the domain model 
schema. Therefore, it is important to choose a response schema that also includes domain values, rather than just hypermedia links. 
We cannot map hypermedia links to a domain model object so easily. Many additional requests may be required; in the worst case 
for every resource, which may result in the n+1 problem, over- and underfetching. It thus follows, the Web API layer not 
only should include hypermedia links but also data. There are many HATEOAS implementation patterns like the **JSON API** 
specification, which seems to be a good solution for this problem. 

**» CQS vs. CQRS**<br/>
 
With traditional CRUD-based web applications, conform to the REST architectural style, we comply with the CQS (Command-Query-Separation) pattern. 
Traditional REST APIs fulfill the need of command and query separation as methods within an entity, whereas, the CQRS (Command-Query-Responsibility-Segregation) pattern
defines commands and queries on different entities (read/write model). **If the Web API layer does not provide an CQRS-based interface, we must be prepared on the client-side to
counteract successfully by defining additional layers of abstraction**. In conjunction with CQS and REST, additional patterns should be applied:
 
![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Up_Down_Flow.PNG)
 
After mapping the server response schema to the domain model, we can replicate rich domain models to arbitrary view models. A rich domain model should not be 
presented in the view layer or sent via message bus. The domain model focuses on invariants and use cases rather than presentational layer requirements.
The adapter or assembler pattern enables two incompatible models to work together.
 
**» Offline First & Client-side Storage**<br/>

Complying with the **Offline First** paradigm, we must ensure that business logic works entirely offline. Modern applications should handle a 
dropped connection gracefully. Like **Progressive Web Apps** (PWA) we want offline capabilities, so that users can interact with the application 
until the network is reachable again. The HTML5 IndexedDB is a large-scale storage system with great browser support. The flexibility of 
IndexedDB when creating object stores with different schemas provides a solid ground for saving and persisting data (Aggregates) on the client-side:

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/BoundedContextSync.PNG)

While Service Workers are mandatory to enable caching of assets like images, videos and stylesheets, we prefer offline capabilities 
build around the IndexedDB database to store and synchronize data custom-made. With Angular 6 and the @angular/pwa module we have great support 
for building PWAs very easily. But we only use `asset groups` and omit `data groups` to retain control over the client cache, otherwise the PWA module will take over control 
of at which point data will be cached and retrieved from the server. The Angular 6 PWA module is not capable of caching POST requests without manual instructions.
Of course we wish to take advantage of native platform features like push notifications etc. Native features are considered as add-ons to the aforementioned 
IndexedDB approach, in which the focus is on client-side persistence as first-class citizen.

**» CQRS in Angular**<br/>
 
@TODO [Image/Text]

# State Management 

With Single Page Applications (SPA), we get the flexibility and cross-platform functionality of a web application as well as the 
client state management of native applications. In a SPA most of the business logic is implemented in the client and the server 
is used as an API for authentication, validation or persistence. Typically, a SPA has more complex states than traditional server-side 
applications. There are an array of different states to deal with:

Domain State | Addressable State (URL) | Draft State | Persisted State | View State | Application State |
------------|------------------|-------------|-----------------|--------------|--------------|
Domain Model | Sort/Filter/Search | E-Mail, Comments | Database, Local Storage | Scroll-position| Online/Offline|

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
    
    isLoggedIn(){}
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
    showPicture: boolean;
    filterBy: string; 
}
```

## State Management Service

Build a basic state management service to share state and communicate state changes using Angular's built-in change detection, along with the operations, 
transformations, and rules for creating, manipulating and storing that data. Use a state management service for any type of application data 
that requires state or storage management. Let's have a look at an example of how to define a state management service for a customer entity: 
           
```
@Injectable
export class CustomerService {
    private customers: ICustomer[] = [];
   
    getCustomers(){}
    getCustomer(id: number){}
    
    createCustomer(customer: ICustomer){}
    deleteCustomer(id: number){}
    updateCustomer(customer: ICustomer){} 
    sortCustomer(type='ASC'){}
}
```

A state management service unifies multiple DDD layers for the sake of simplicity. The state management logic may comprise data access, use cases or mapper logic.
       
## Notification Service

One downside of sharing and binding state through services is that they are coupled to the view. Delayed changes to the state must be handled 
by asynchronous binding techniques to **keep the shared state in sync**. However, with EventEmitters, Subjects or BehaviourSubjects we share data through notifications. 
We subscribe and react to changes using notification services. Those notifications are more than just changes to bound values. 

Let's have a look at an example of how to build a notification service based on a Subject:

```
@Injectable()
export class NotificationService {
    private _subject = new Subject<any>();
 
    notify(news: string): void {
        this._subject.next({ news: news });
    }
 
    listen(): Observable<any> {
        return this._subject.asObservable();
    }

    flush(): void {
        this._subject.next();
    }

    complete(): void {
        return this._subject.complete();
    }
}
```

**» Keep the state in sync**<br/>

Angular's change detection provides notification of any changes to state values by `getter` accessor methods, if the values are bound in the template. 
This way, we keep the state in sync. Observables, Subjects or BehaviourSubjects can help to simplify asynchronous data-handling. 
When sharing data that should always be in sync, reactive extensions are good solutions to this situation.

## GoF State Pattern

If we need a more robust UI state management approach, the State Pattern might be a good candidate. The GoF (Gang of Four) State Pattern is an object oriented pattern to handle the 
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
with reference to one and only one component. Indeed secondary (auxiliary) and pathless (master-children) routes allows us 
to initiate multiple components in parallel, but bringing limitations and sacrifices to a special syntax that does not comply 
with RESTful practices. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Master2Aux.PNG)

Pathless or componentless routes are a good way to share data between sibling components. This kind of routes provide a way
to load multiple components at a time. However, deep-linking is not supported how it should be. It exists a hack to enable 
deep-linking to some extend. This is achieved by checking route params in named router outlets or by intervening with
Resolvers or Route Guards. If specific invariants evaluate to true, we will display the component:

`<router-outlet *ngIf="id==='22'" name='employee'></router-outlet>` 

The pathless strategy is not well documented, especially when it comes to deep-linking it leads to unexpected behaviour.
Secondary (Auxiliary) routes should be addressed in any use case that requires a few components to be initiated in 
parallel at random places. The router module is therefore well suited for mobile related navigation patterns. 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Notebook.PNG)

# Summary

With multi-layered applications it is clear that critical decisions have to be made regarding technical aspects at the micro-level. 
Most of them are determined by the requirements at the macro-level, which includes decisions on the scope of:

- SPA vs. MPA
- UX vs. API first
- Smart vs. Dump client
- Public vs. Private API
- Mobile vs. Desktop first
- Offline vs. Online first

# Project Structure [src]

The directory structure does not follow the recommended application structure of Angular CLI.
It is designed for Single Page Applications (SPA) as well as Multi Page Applications (MPA). 

![alt text](https://raw.githubusercontent.com/bilgino/ng4StarterKit/master/src/assets/images/Scaffolding.png)

# Build (Bundle)

First of all build the [dist] folder for the development host:
```
npm run build:dev
```

...or use the webpack-dev-server directly:
```
npm run server:dev
```

# AOT 
First of all build the [aot] compilation:
```
npm run build:aot:ngc
```
This creates a [aot] folder for the production host.

Now build the [dist] folder for the production host:

```
npm run build:prod:aot
```
...or use the webpack-dev-server directly:
```
npm run server:prod:aot
```

# Start

Open the web browser and type localhost:8080

---
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