import { Query } from './Query';

describe('Query', function() {
  it('should create fields query', function() {
    expect(Query.fields('foo')).toEqual('foo');
    expect(Query.fields({foo: {bar: 'zoo'}})).toEqual('foo(bar(zoo))');
  });

  it('should support array', function() {
    expect(Query.fields(['foo', 'bar'])).toEqual('foo,bar');
  });

  it('should correctly merge fields', function() {
    expect(Query.fields([
      {foo: {bar: null}},
      {foo: {zoo: null}},
      {foo: null}
    ])).toEqual('foo(bar,zoo)');
  });
});