import { tasks } from './tasks';

let mockApiHandlerService = jasmine.createSpyObj('TaskService', {
  getTasks: Promise.resolve(tasks),
});

export default mockApiHandlerService;
