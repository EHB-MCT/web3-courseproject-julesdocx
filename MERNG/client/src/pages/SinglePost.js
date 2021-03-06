import { gql, useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import { useContext, useRef, useState } from 'react';
import { Grid, Image, Card, Button, Icon, Label, Transition, Form } from 'semantic-ui-react';
import LikeButton from '../components/LikeButton';
import { AuthContext } from '../context/auth'
import DeleteButton from '../components/DeleteButton'

function SinglePost(props) {
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const commentInputRef = useRef(null);

    const[createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: { postId, body: comment },
        update() {
            setComment('');
            commentInputRef.current.blur();
        }
    })

    const { data: { getPost: post} = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId: postId
        }
    });

    function deletePostCallBack() {
        props.history.push('/');
    }

    let postMarkup;
    if(!post) {
        postMarkup = <p>Loading post..</p>
    } else {
        const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = post;
        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size="small"
                            floated="right"
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    {username}
                                </Card.Header>
                                <Card.Meta>
                                    {moment(createdAt).fromNow()}
                                </Card.Meta>
                                <Card.Description>
                                    {body}
                                </Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likes, likeCount}} />
                                <Button as="div"
                                 labelPosition="right"
                                 onClick={() => console.log('Comment on Post')}>
                                     <Button basic color="blue">
                                         <Icon name="comments"></Icon>
                                     </Button>
                                     <Label basic color="blue" pointing="left">
                                         {commentCount}
                                     </Label>
                                </Button>
                                { user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallBack}/>
                                )}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                <p>post a comment</p>
                             <Form>
                                 <div className="ui action input fluid">
                                     <input
                                        type="text"
                                        placeholder="Comment.."
                                        value={comment}
                                        onChange={event => setComment(event.target.value)}
                                        ref={commentInputRef}
                                        />
                                    <button type="submit" className="ui button" disabled={comment.trim() === ''} onClick={createComment}>
                                        Submit
                                    </button>
                                 </div>
                             </Form>
                                </Card.Content>
                            </Card>
                        )}
                        <Transition.Group>
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>
                                        {comment.username}
                                    </Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                        </Transition.Group>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

const CREATE_COMMENT_MUTATION = gql`
    mutation ($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            createdAt
            username 
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`

export default SinglePost;