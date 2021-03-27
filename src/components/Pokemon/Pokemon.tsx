import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Alert,
  Card,
  PageHeader,
  Descriptions,
  Typography,
  Image,
  List,
  Button,
} from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { getPokemon } from "../../redux/pokemons";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../redux/rootReducer";

const { Text } = Typography;

export const Pokemon = () => {
  const { id }: any = useParams();

  const dispatch = useDispatch();

  const { loadingIds, errorMap, pokemons } = useSelector(
    ({ pokemons }: IRootState) => ({
      loadingIds: pokemons.loadingIds,
      errorMap: pokemons.errorMap,
      pokemons: pokemons.pokemons,
    })
  );

  useEffect(() => {
    getPokemon(id, dispatch);
  }, []);

  const history = useHistory();

  const pokemon = pokemons.get(id);

  return (
    <>
      <PageHeader
        onBack={() => history.push("/chesstery-test/pokemons")}
        title="Pokemons"
        subTitle={id}
        extra={[
          <Button
            onClick={() => getPokemon(id, dispatch)}
            type="primary"
            icon={<ReloadOutlined />}
          />,
        ]}
      />
      {errorMap.has(id) && (
        <Alert
          message="An error occurred on this page"
          description={errorMap.get(id).message ? errorMap.get(id).message : JSON.stringify(errorMap.get(id))}
          type="error"
        />
      )}
      {!errorMap.has(id) && (
        <Card loading={loadingIds.has(id)} title={pokemon?.name}>
          {pokemon && (
            <>
              <Image
                width={200}
                src={pokemon.imageUrl}
                preview={{
                  src: pokemon.imageUrlHiRes,
                }}
              />
              <Descriptions column={2}>
                <Descriptions.Item label="Name">
                  {pokemon.name}
                </Descriptions.Item>
                <Descriptions.Item label="Supertype">
                  {pokemon.supertype}
                </Descriptions.Item>
                <Descriptions.Item label="Rarity">
                  {pokemon.rarity}
                </Descriptions.Item>
                <Descriptions.Item label="Id">{pokemon.id}</Descriptions.Item>
                <Descriptions.Item label="Series">
                  {pokemon.series}
                </Descriptions.Item>
                <Descriptions.Item label="Set Code">
                  {pokemon.setCode}
                </Descriptions.Item>
                <Descriptions.Item label="Number">
                  {pokemon.number}
                </Descriptions.Item>
                {pokemon.retreatCost && (
                  <Descriptions.Item label="Retreat cost">
                    {pokemon.retreatCost}
                  </Descriptions.Item>
                )}
                {pokemon.convertedRetreatCost && (
                  <Descriptions.Item label="Converted retreat cost">
                    {pokemon.convertedRetreatCost}
                  </Descriptions.Item>
                )}
                {pokemon.text && pokemon.text.length && (
                  <Descriptions.Item label="Text">
                    {pokemon.text.join(";\n")}
                  </Descriptions.Item>
                )}
                {pokemon.nationalPokedexNumber !== undefined && (
                  <Descriptions.Item label="National pokedex number">
                    {pokemon.nationalPokedexNumber}
                  </Descriptions.Item>
                )}
                {pokemon.types && (
                  <Descriptions.Item label="Types">
                    {pokemon.types.join("; ")}
                  </Descriptions.Item>
                )}
                {pokemon.hp && (
                  <Descriptions.Item label="HP">{pokemon.hp}</Descriptions.Item>
                )}
                {pokemon.set && (
                  <Descriptions.Item label="Set">
                    {pokemon.set}
                  </Descriptions.Item>
                )}
                {pokemon.subtype && (
                  <Descriptions.Item label="Subtype">
                    {pokemon.subtype}
                  </Descriptions.Item>
                )}
              </Descriptions>
              <Descriptions column={1}>
                {pokemon.attacks && pokemon.attacks.length && (
                  <Descriptions.Item>
                    <List
                      header={<div>Attacks</div>}
                      dataSource={pokemon.attacks}
                      renderItem={({
                        cost,
                        name,
                        text,
                        damage,
                        convertedEnergyCost,
                      }) => (
                        <List.Item>
                          <Typography.Text>
                            Name: {name}
                            <br />
                            Cost: {cost.join(", ")}
                            <br />
                            Text: {text}
                            <br />
                            Damage: {damage}
                            <br />
                            Converted Energy Cost: {convertedEnergyCost}
                            <br />
                          </Typography.Text>
                        </List.Item>
                      )}
                    />
                  </Descriptions.Item>
                )}
                {pokemon.resistances && pokemon.resistances.length && (
                  <Descriptions.Item>
                    <List
                      header={<div>Resistances</div>}
                      dataSource={pokemon.resistances}
                      renderItem={({ type, value }) => (
                        <List.Item>
                          <Typography.Text>
                            Type: {type}
                            <br />
                            Value: {value}
                            <br />
                          </Typography.Text>
                        </List.Item>
                      )}
                    />
                  </Descriptions.Item>
                )}
                {pokemon.weaknesses && pokemon.weaknesses.length && (
                  <Descriptions.Item>
                    <List
                      header={<div>Weaknesses</div>}
                      dataSource={pokemon.weaknesses}
                      renderItem={({ type, value }) => (
                        <List.Item>
                          <Typography.Text>
                            Type: {type}
                            <br />
                            Value: {value}
                            <br />
                          </Typography.Text>
                        </List.Item>
                      )}
                    />
                  </Descriptions.Item>
                )}
                {pokemon.ability && (
                  <Descriptions.Item label="Ability">
                    <Typography.Text>
                      Name: {pokemon.ability.name}
                      <br />
                      Text: {pokemon.ability.text}
                      <br />
                      Type: {pokemon.ability.type}
                      <br />
                    </Typography.Text>
                  </Descriptions.Item>
                )}
                {pokemon.ancientTrait && (
                  <Descriptions.Item label="Ancient Trait">
                    <Typography.Text>
                      Name: {pokemon.ancientTrait.name}
                      <br />
                      Text: {pokemon.ancientTrait.text}
                      <br />
                    </Typography.Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
              <Text type="secondary">Artist: {pokemon.artist}</Text>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default Pokemon;
