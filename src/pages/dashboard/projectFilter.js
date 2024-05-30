const filterList = ['all', 'mine', 'development', 'design', 'sales', 'marketing']

export default function ProjectFilter({currFilter,changeFilter}) {



    return (
        <div className="project-filter">
            <nav>
                <p>Filter by:</p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => changeFilter(f)}
                        className={currFilter === f ? 'active' : ''}
                    >{f}</button>
                ))}
            </nav>

        </div>
    )
}