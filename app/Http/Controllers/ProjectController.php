<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{

    public function __construct()
    {
        $this->middleware(['cors']);
        $this->middleware(['auth:sanctum']);
        $this->middleware(['log.routes']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Project::withCount(['tasks', 'unfinishedTasks'])->with('state:name,id')->paginate(8);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = $request->validate([
            'name' => 'required|max:255|unique:projects',
            'description' => 'required',
        ]);

        Project::create($request->all());

        return $validation;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Project::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   

        $request->validate([
            'name' => 'required|max:255|unique:projects,name,'.$id,
            'description' => 'required',
            'project_state_id' => 'required|integer|min:1|max:2',
        ]);

        $project = Project::find($id);
        $project->update($request->all());
        return $project;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
       return Project::destroy($id);
    }

    public function searchByNameBeg($key){
        return Project::withCount(['tasks', 'unfinishedTasks'])
            ->with('state:name,id')
            ->where('name', 'like', "$key%")
            ->paginate(8);
    }

    public function searchByNameAny($key){
        return Project::withCount(['tasks', 'unfinishedTasks'])
            ->with('state:name,id')
            ->where('name', 'like', "%$key%")
            ->paginate(8);
    }

    public function searchById($key){
        return Project::withCount(['tasks', 'unfinishedTasks'])
            ->with('state:name,id')
            ->Where('id', 'like', "%$key%")
            ->paginate(8);
    }

}
