class HelloWorld {
  constructor() {
    this.message = 'hello world!'
  }

  saySomething() {
    alert(this.message)
  }
}

var helloWorld = new HelloWorld()
helloWorld.saySomething()
