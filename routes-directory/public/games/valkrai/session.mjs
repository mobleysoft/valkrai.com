// Page overlays always suspend simulation and clear every held input on entry AND exit.
export class SessionGate {
 constructor(clear){this.clear=clear;this.view='selector';this.engaged=false;this.generation=0}
 set(view){this.clear();this.view=view;this.generation++}
 engage(value){this.clear();this.engaged=value;this.generation++}
 get acceptsInput(){return this.engaged&&this.view==='game'}
}
