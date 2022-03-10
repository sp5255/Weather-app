function DetailsIconCard(props) {
    const { icon, info, unit } = props;
    return (
        <div className="details--icon">
            <img src={icon} alt="icon" />
            {unit && <label>Feels like </label>}
            <p>{info}</p>
            {unit && <label>&#8451;</label>}
        </div>
    );
}

export default DetailsIconCard;
