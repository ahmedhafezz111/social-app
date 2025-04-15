import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../core/services/posts/posts.service';
import { IPosts } from '../core/interfaces/iposts';
import { Iprofile } from '../core/interfaces/iprofile';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from '../shared/ui/comments/comments.component';
import { CommentsService } from '../core/services/comments/comments.service';
import { IComment } from '../core/interfaces/icomment';

@Component({
  selector: 'app-profile',
  imports: [DatePipe,CommentsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

    commentsData:IComment[] = []
    private readonly commentsService = inject(CommentsService)

  private readonly postsService = inject(PostsService)
  postsData:IPosts[] =[]
  profilePosts:Iprofile[]=[]

  getMyPosts(){
    this.postsService.getUserPosts().subscribe({
      next:(res)=>{
        console.log(res.posts);
        this.profilePosts = res.posts
        
      }
    })
  }

ngOnInit(): void {
  this.getMyPosts()
}

}
