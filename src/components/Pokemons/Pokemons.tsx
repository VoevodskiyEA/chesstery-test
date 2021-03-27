import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IRootState } from "../../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons } from "../../redux/pokemons";
import { Table, Empty, Alert, PageHeader, Button } from "antd";
import { IPokemon } from "../../api/pokemonsTypes";
import { ReloadOutlined } from "@ant-design/icons";

export const Pokemons = () => {
  const history = useHistory();

  const { loadingAll, errorAll, pokemons } = useSelector(
    ({ pokemons }: IRootState) => ({
      loadingAll: pokemons.loadingAll,
      errorAll: pokemons.errorAll,
      pokemons: pokemons.pokemons,
    })
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getAllPokemons(dispatch);
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (image: string) => <img src={image} />,
      width: 250,
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rarity",
      dataIndex: "rarity",
      key: "rarity",
    },
    {
      title: "Supertype",
      dataIndex: "supertype",
      key: "supertype",
    },
    {
      title: "Series",
      dataIndex: "series",
      key: "series",
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
  ];

  return (
    <>
      <PageHeader
        title="Pokemons"
        extra={[
          <Button
            onClick={() => getAllPokemons(dispatch)}
            type="primary"
            icon={<ReloadOutlined />}
          />,
        ]}
      />
      {errorAll && !loadingAll && (
        <Alert
          message="An error occurred on this page"
          description={
            errorAll.message ? errorAll.message : JSON.stringify(errorAll)
          }
          type="error"
        />
      )}
      {!errorAll && (
        <Table
          dataSource={Array.from(pokemons.values())}
          columns={columns}
          loading={loadingAll}
          onRow={({ id }: IPokemon) => {
            return {
              onClick: () => {
                history.push(`/chesstery-test/pokemons/${id}`);
              },
            };
          }}
        />
      )}
      {!loadingAll && (!pokemons || pokemons.size === 0) && (
        <Empty description={<span>No Pokemons found</span>} />
      )}
    </>
  );
};
