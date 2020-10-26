var levels = ["Domain", "Task", "Action"]

class DomainColl {
    constructor(domains) {
        this.domains = domains;
    }
}

class Domain {
    constructor(name, tasks, showDetails) {
        this.name = name;
        this.tasks = tasks;
        this.showDetails = showDetails;
    }
}

class Task {
    constructor(importance, name, actions, timings, deadline, finished, showDetails) {
        this.importance = importance;
        this.name = name;
        this.actions = actions;
        this.timings = timings;
        this.deadline = deadline;
        this.finished = finished;
        this.showDetails = showDetails;
    }
}

class Action {
    constructor(name, timings, finished, showDetails) {
        this.name = name;
        this.timings = timings;
        this.finished = finished;
        this.showDetails = showDetails;
    }
}

class Timings {
    constructor(estDuration, duration, showDetails) {
        this.estDuration = estDuration;
        this.duration = duration;
        this.showDetails = showDetails;
    }
}