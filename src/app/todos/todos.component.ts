import { Component, Input, OnInit } from '@angular/core';
import { Todo } from "../Todo";
import { TodoService } from '../todo.service';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { of, repeat } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  pageIndex:number = 0;
  pageSize:number = 5;
  lowValue:number = 0;
  highValue:number = 5; 
  currentPage: number = 0;
  countTodo: any;

 todos!: Todo[];
  inputToDo: string="";
  constructor(
    private todoService: TodoService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.todos = [];
    this.getAllTodos();
  }


  getAllTodos(): void {
    this.todoService.getPaginationItems(this.pageIndex, this.pageSize).subscribe(data => this.todos = data);
    this.todoService.getCountTodo().subscribe(data => {
      this.countTodo = data[0].count;
      console.log(data[0].count)
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo.id, todo.todo).subscribe();
  }

  Delete(todo: Todo){
    this.todoService.deleteTodo(todo.id).subscribe();
    this.todos = this.todos.filter((v,index) => v.id !== todo.id);
    this.getAllTodos();
  }

  Add(){
    if(this.inputToDo.length > 0){
      this.todoService.AddTodo({ todo: this.inputToDo } as Todo).subscribe();
      this.getAllTodos();
      this.inputToDo = "";
    }
    else{
      alert("invalid input, must be more than 5 characters");
    }
  }

  openDialog(todo: Todo) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.Delete(todo);
      }
    });
  }

  updatePageIndex(event: any){  
      this.pageIndex = event.pageIndex;
      this.getAllTodos();
  }
}

