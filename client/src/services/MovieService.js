// Insert post, put, get, delete services here for movies
const app = express();

app.use(cors());

app.get('/total_movies', (req,res) => {
    res.send('total movies')
})

app.listen(3000, () => {
    console.log('running on post 3000')
})